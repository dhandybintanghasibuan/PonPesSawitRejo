"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase";

type OutingClass = {
  id: string;
  nama: string;
  deskripsi: string;
  gambar_url?: string;
  tanggal?: string;
};

export default function OutingClassPage() {
  const [items, setItems] = useState<OutingClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true); // biar aman dari hydration error

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("outingclass")
        .select("*")
        .order("tanggal", { ascending: false });

      if (error) {
        console.error("Error fetching outingclass:", error.message);
      } else {
        setItems(data || []);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-tr from-[#e0f2fe] to-[#f0fdf4] py-20 px-4 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-blue-700 hover:underline inline-flex items-center gap-1"
          >
            <i className="fas fa-arrow-left text-xs" />
            Kembali
          </button>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#0d4f9e] mb-6">
          Outing Class Santri
        </h1>
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-14">
          Dokumentasi kegiatan belajar menyenangkan di luar kelas, memperkuat
          keterampilan sosial dan kekompakan antarsantri.
        </p>

        {!hydrated || loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-400">Belum ada data Outing Class.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={item.gambar_url || "/assets/img/default.jpg"}
                    alt={item.nama}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-[#0d4f9e] mb-1">
                    {item.nama}
                  </h3>
                  {item.tanggal && hydrated && (
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <p className="text-sm text-gray-700">{item.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
