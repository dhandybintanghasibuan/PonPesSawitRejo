"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Facility = {
  id: string;
  nama: string;
  deskripsi: string;
  gambar_url: string;
};

export default function AllFacilityPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchFacilities = async () => {
    const { data, error } = await supabase
      .from("facilities")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setFacilities(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-white to-blue-50 islamic-border">
      <div className="container mx-auto px-4">
        {/* Judul dan Deskripsi */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-2 tracking-tight">
            Semua Fasilitas Pesantren
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-md">
            Jelajahi berbagai fasilitas unggulan yang tersedia untuk mendukung
            pendidikan dan kenyamanan santri.
          </p>
          <div className="w-24 h-1 bg-[#0d4f9e] mx-auto mt-4 rounded-full" />
        </div>

        {/* Tombol Kembali */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-sm text-blue-600 hover:underline hover:text-blue-800 transition"
          >
            ← Kembali
          </button>
        </div>

        {/* Grid Fasilitas */}
        {loading ? (
          <p className="text-center text-gray-500 italic">
            Memuat fasilitas...
          </p>
        ) : facilities.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Belum ada data fasilitas.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-[#0d4f9e]/30 hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
              >
                {/* Gambar */}
                <div className="h-40 w-full overflow-hidden">
                  <Image
                    src={item.gambar_url}
                    alt={item.nama}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                </div>

                {/* Konten */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-green-900 mb-2">
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
