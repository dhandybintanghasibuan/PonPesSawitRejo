// src/app/program/[id]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// Definisi tipe params yang benar
interface PageParams {
  params: {
    id: string;
  };
}

export default async function ProgramDetailPage({ params }: PageParams) {
  const supabase = createClient();

  const { data: program, error } = await supabase
    .from("program")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !program) {
    notFound();
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen islamic-border">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/#program"
            className="text-sm text-blue-700 hover:underline inline-flex items-center gap-1"
          >
            <i className="fas fa-arrow-left text-xs" />
            Kembali
          </Link>
        </div>

        <div className="rounded-xl overflow-hidden shadow-md mb-10">
          <Image
            src={program.image_url || "/assets/img/default.jpg"}
            alt={program.nama}
            width={1200}
            height={600}
            className="w-full h-80 object-cover"
          />
        </div>

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            {program.nama}
          </h1>
          <div className="w-24 h-1 bg-[#0d4f9e] mx-auto mb-6 rounded" />
          <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">
            {program.deskripsi}
          </p>
        </div>
      </div>
    </section>
  );
}
