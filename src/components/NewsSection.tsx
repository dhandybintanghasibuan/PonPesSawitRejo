"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type NewsItem = {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
};

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Gagal memuat berita:", error.message);
      } else {
        setNews(data || []);
      }

      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <section
      id="berita"
      className="min-h-screen py-20 bg-white islamic-border flex items-center"
    >
      <div className="container mx-auto px-4">
        {/* Judul Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Berita Pesantren
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Informasi dan kabar terbaru dari Pondok Pesantren Sawit Rejo
          </p>
          <div className="w-24 h-1 bg-[#0d4f9e] mx-auto mt-4" />
        </div>

        {/* Konten Berita */}
        {loading ? (
          <p className="text-center text-gray-500 italic">Memuat berita...</p>
        ) : news.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Belum ada berita yang tersedia.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all islamic-card"
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    Tidak ada gambar
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-green-800 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {item.content}
                  </p>
                  <Link
                    href={`/berita/${item.id}`}
                    className="inline-block mt-2 px-4 py-2 bg-[#0d4f9e] text-white rounded-md text-sm font-semibold shadow hover:bg-[#093c7e] transition duration-200"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
