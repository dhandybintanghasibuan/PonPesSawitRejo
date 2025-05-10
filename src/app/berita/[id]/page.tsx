"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Linkify from "linkify-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const linkifyOptions = {
  target: "_blank",
  className: "text-blue-600 underline hover:text-blue-800",
};

type Berita = {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
};

export default function NewsDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [berita, setBerita] = useState<Berita | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !data) {
        router.push("/404");
      } else {
        setBerita(data);
      }
      setLoading(false);
    };

    if (params.id) fetchBerita();
  }, [params.id, router]);

  if (loading) return <p className="text-center py-10">Memuat...</p>;
  if (!berita) return null;

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 flex flex-col justify-between min-h-[600px]">
        {/* Tombol Kembali */}
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-[#0d4f9e] text-white text-sm rounded hover:bg-[#093c7e] transition self-start"
        >
          ← Kembali
        </button>

        {/* Judul */}
        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
          {berita.title}
        </h1>

        {/* Gambar */}
        {berita.image_url && (
          <div className="w-full h-64 relative rounded-lg overflow-hidden mb-6 shadow-md">
            <Image
              src={berita.image_url}
              alt={berita.title}
              fill
              className="object-cover rounded"
              priority
            />
          </div>
        )}

        {/* Tanggal */}
        <div className="text-sm text-gray-600 mb-6">
          {new Date(berita.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

        {/* Konten */}
        <div className="prose max-w-none prose-lg prose-slate flex-grow">
          <Linkify options={linkifyOptions}>{berita.content}</Linkify>
        </div>
      </div>
    </section>
  );
}
