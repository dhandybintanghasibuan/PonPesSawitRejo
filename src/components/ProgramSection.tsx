"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProgramSection() {
  const [programs, setPrograms] = useState<any[]>([]);

  // Ambil data program
  const fetchPrograms = async () => {
    const { data, error } = await supabase.from("program").select("*");
    if (!error && data) setPrograms(data);
  };

  useEffect(() => {
    fetchPrograms();

    const channel = supabase
      .channel("realtime:program")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "program",
        },
        () => {
          fetchPrograms();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section
      id="program"
      className="min-h-screen py-20 bg-gray-50 islamic-border flex items-center"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Program Pendidikan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berbagai program unggulan untuk membentuk generasi Qur&apos;ani yang
            berakhlak mulia
          </p>
          <div className="w-24 h-1 bg-[#0d4f9e] mx-auto mt-4"></div>
        </div>

        {/* Daftar Program */}
        {programs.length === 0 ? (
          <p className="text-center text-gray-500">
            Belum ada program tersedia.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <Link
                href={`/program/${
                  program.slug ||
                  program.nama.toLowerCase().replace(/\s+/g, "-")
                }`}
                key={idx}
                className="group transition-transform transform hover:scale-[1.02]"
              >
                <div className="bg-white rounded-xl overflow-hidden border border-[#0d4f9e] shadow-md h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={program.image_url || "/assets/img/default.jpg"}
                      alt={program.nama}
                      width={600}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#0d4f9e]/10 p-3 rounded-full mr-4">
                        <i className="fas fa-book-open text-[#0d4f9e] text-xl"></i>
                      </div>
                      <h3 className="text-xl font-bold text-green-900">
                        {program.nama}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-sm flex-1 leading-relaxed">
                      {program.deskripsi ||
                        "Program pendidikan unggulan di Pondok Pesantren"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
