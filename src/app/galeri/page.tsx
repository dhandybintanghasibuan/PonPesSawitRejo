"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { FaArrowLeft } from "react-icons/fa"; // Ikon React

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type GaleriItem = {
  id: string;
  title: string;
  image_url: string;
};

export default function GaleriPage() {
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGaleri = async () => {
      const { data, error } = await supabase
        .from("galeri")
        .select("id, title, image_url")
        .order("created_at", { ascending: false });

      if (!error && data) setItems(data);
      setLoading(false);
    };

    fetchGaleri();
  }, []);

  return (
    <section className="min-h-screen py-20 bg-gray-50 islamic-border">
      <div className="container mx-auto px-4">
        {/* Tombol Kembali */}
        <div className="mb-6">
          <Link
            href="/#galeri"
            className="inline-flex items-center text-sm text-blue-700 hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Kembali
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-8">
          Semua Galeri Kegiatan
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Memuat galeri...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada galeri tersedia.</p>
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
      </div>
    </section>
  );
}
