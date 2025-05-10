"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
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

export default function FacilitySection() {
  const [facilities, setFacilities] = useState<Facility[]>([]);

  const fetchFacilities = async () => {
    const { data, error } = await supabase
      .from("facilities")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setFacilities(data);
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
    <section
      id="fasilitas"
      className="min-h-screen py-20 bg-white islamic-border flex items-center"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Fasilitas Pesantren
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fasilitas lengkap untuk mendukung kegiatan belajar mengajar dan
            kehidupan santri
          </p>
          <div className="w-24 h-1 bg-[#0d4f9e] mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-[#0d4f9e]/30 hover:shadow-xl transition duration-300"
            >
              <div className="h-40 w-full overflow-hidden">
                <Image
                  src={item.gambar_url}
                  alt={item.nama}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              </div>
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

        {facilities.length > 8 && (
          <div className="mt-10 text-center">
            <Link
              href="/fasilitas"
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
