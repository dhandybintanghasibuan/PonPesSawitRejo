"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import { FaThumbtack } from "react-icons/fa";

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
  is_pinned?: boolean;
};

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id, title, content, image_url, created_at, is_pinned");

      if (error) {
        console.error("Gagal memuat berita:", error.message);
      } else {
        const normalized = (data || []).map((item) => ({
          ...item,
          is_pinned: item.is_pinned ?? false,
        }));

        // Urutkan: pinned dulu, lalu terbaru
        normalized.sort((a, b) => {
          if (a.is_pinned === b.is_pinned) {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          }
          return a.is_pinned ? -1 : 1;
        });

        setNews(normalized);
      }

      setLoading(false);
    };

    fetchNews();
  }, []);

  const visibleNews = news.slice(0, visibleCount);

  return (
    <section
      id="berita"
      className="min-h-screen py-20 bg-gray-50 islamic-border flex items-center"
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
          <div className="w-24 h-1 bg-[#0d4f9e] mx-auto mt-4 rounded" />
        </div>

        {/* Daftar Berita */}
        {loading ? (
          <p className="text-center text-gray-500 italic">Memuat berita...</p>
        ) : news.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Belum ada berita yang tersedia.
          </p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {visibleNews.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-[#0d4f9e]/20 hover:shadow-lg transition-all flex flex-col"
                >
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                      Gambar tidak tersedia
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-green-900 mb-2 line-clamp-2 flex items-center gap-2">
                      {item.is_pinned && (
                        <FaThumbtack className="text-yellow-500" title="Berita Terpin" />
                      )}
                      {item.title}
                    </h3>
                    <p className="text-gray-700 text-sm flex-grow mb-4 line-clamp-3">
                      {item.content
                        ? item.content.replace(/<[^>]+>/g, "").slice(0, 100) + "..."
                        : "Konten tidak tersedia."}
                    </p>
                    <div className="mt-auto">
                      <Link
                        href={`/berita/${encodeURIComponent(item.id)}`}
                        className="inline-block px-3 py-1.5 bg-[#0d4f9e] text-white rounded-full text-sm font-medium hover:bg-[#093c7e] transition"
                      >
                        Baca Selengkapnya →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tombol Lihat Lebih Banyak */}
            {news.length > visibleCount && (
              <div className="text-center mt-10">
                <Link
                  href="/berita"
                  className="inline-block bg-[#0d4f9e] hover:bg-[#093e7a] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  Lihat Lebih Banyak →
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
