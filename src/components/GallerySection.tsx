"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type GaleriItem = {
  id: string;
  title: string;
  image_url: string;
};

export default function GallerySection() {
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    const { data, error } = await supabase
      .from("galeri")
      .select("id, title, image_url")
      .order("created_at", { ascending: false });

    if (!error && data) setItems(data);
    setLoading(false);
  };

  return (
    <section
      id="galeri"
      className="min-h-screen py-20 bg-white islamic-border flex items-center"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Galeri Kegiatan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Momen-momen dalam kehidupan santri di Pondok Pesantren
            Sawit Rejo
          </p>
          <div className="w-24 h-1 bg-[#0d4f9e] mx-auto mt-4" />
        </div>

        {/* Galeri Grid */}
        {loading ? (
          <p className="text-center text-gray-500">Memuat galeri...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500">
            Belum ada galeri tersedia.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-lg overflow-hidden shadow-sm border border-[#0d4f9e]/20 hover:shadow-md transition duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                  <span className="text-white text-sm font-semibold tracking-wide px-3 text-center">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Button */}
        {items.length > 8 && (
          <div className="text-center mt-10">
            <button className="bg-[#0d4f9e] hover:bg-[#093e7a] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              Lihat Lebih Banyak <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
