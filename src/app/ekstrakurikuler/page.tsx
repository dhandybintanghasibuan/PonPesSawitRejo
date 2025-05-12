"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import Image from "next/image";

type Ekstrakurikuler = {
  id: string;
  nama: string;
  deskripsi: string;
  gambar_url?: string;
};

export default function EkstrakurikulerPage() {
  const [items, setItems] = useState<Ekstrakurikuler[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("ekstrakurikuler")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setItems(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#e0f2fe] to-[#f0fdf4] py-20 px-4 text-gray-800">
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
          Kegiatan Ekstrakurikuler
        </h1>
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-14">
          Berbagai kegiatan yang mendukung minat, bakat, serta pembentukan
          karakter santri secara menyeluruh.
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Memuat kegiatan...</p>
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
    