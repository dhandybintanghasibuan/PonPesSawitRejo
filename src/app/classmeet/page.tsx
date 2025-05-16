"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase"; // pastikan file ini sudah benar

type ClassMeet = {
  id: string;
  nama: string;
  deskripsi: string;
  gambar_url?: string;
};

export default function ClassMeetPage() {
  const [items, setItems] = useState<ClassMeet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("classmeet") // Gunakan "classmeet" sesuai nama tabel kamu
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        setItems(data || []);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fdf2f8] to-[#f0f9ff] py-20 px-4 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Tombol Kembali */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-blue-700 hover:underline inline-flex items-center gap-1"
          >
            <i className="fas fa-arrow-left text-xs" />
            Kembali
          </button>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#0d4f9e] text-center mb-10">
          Kegiatan Class Meet
        </h1>
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-14">
          Momen kebersamaan dan kompetisi antar kelas yang penuh semangat dan
          sportivitas, membentuk karakter serta kekompakan santri.
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Memuat kegiatan...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-400">Belum ada data Class Meet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full h-52">
                  <Image
                    src={item.gambar_url || "/assets/img/default.jpg"}
                    alt={item.nama}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#0d4f9e] mb-2">
                    {item.nama}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
