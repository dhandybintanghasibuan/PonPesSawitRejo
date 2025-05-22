"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { FaArrowLeft } from "react-icons/fa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type NewsItem = {
  id: string;
  title: string;
  image_url?: string;
  created_at: string;
  is_pinned?: boolean;
};

export default function AllBeritaPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id, title, image_url, created_at, is_pinned")
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false });

      if (!error && data) {
        const normalized = data.map((item) => ({
          ...item,
          is_pinned: item.is_pinned ?? false,
        }));
        setNews(normalized);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <section className="min-h-screen py-20 bg-gray-50 islamic-border">
      <div className="container mx-auto px-4">
        {/* Tombol Kembali */}
        <div className="mb-6">
          <Link
            href="/#berita"
            className="inline-flex items-center text-sm text-blue-700 hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Kembali
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-8">
          Semua Berita Pesantren
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Memuat berita...</p>
        ) : news.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada berita tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link
                href={`/berita/${item.id}`}
                key={item.id}
                className="group relative rounded-lg overflow-hidden shadow-sm border border-[#0d4f9e]/20 hover:shadow-md transition duration-300"
              >
                <div className="relative h-52 w-full">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="bg-gray-100 text-gray-500 text-sm flex items-center justify-center w-full h-full">
                      Gambar tidak tersedia
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                  <span className="text-white text-sm font-semibold px-4 text-center">
                    {item.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
