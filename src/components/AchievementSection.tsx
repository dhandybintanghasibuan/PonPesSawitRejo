"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Prestasi = {
  id: string;
  judul: string;
  deskripsi: string;
  gambar_url?: string;
};

export default function AchievementSection() {
  const [prestasi, setPrestasi] = useState<Prestasi[]>([]);

  useEffect(() => {
    fetchPrestasi();
  }, []);

  const fetchPrestasi = async () => {
    const { data, error } = await supabase
      .from("prestasi")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setPrestasi(data);
  };

  return (
    <section
      id="prestasi"
      className="min-h-screen py-20 bg-white islamic-border flex items-center"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Prestasi Santri
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Capaian membanggakan yang diraih oleh para santri Pondok Pesantren
            Sawit Rejo.
          </p>
          <div className="w-24 h-1 bg-[#0d4f9e] mx-auto mt-4"></div>
        </div>

        {/* Prestasi Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prestasi.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-[#0d4f9e]/30 hover:shadow-xl transition duration-300"
            >
              {item.gambar_url && (
                <div className="h-40 w-full overflow-hidden">
                  <Image
                    src={item.gambar_url}
                    alt={item.judul}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  {item.judul}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Lebih Banyak */}
        {prestasi.length > 8 && (
          <div className="mt-10 text-center">
            <Link
              href="/prestasi"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0d4f9e] hover:bg-[#093e7a] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              Lihat Lebih Banyak <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
