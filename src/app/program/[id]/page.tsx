// src/app/program/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: program, error } = await supabase
    .from("program")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !program) {
    notFound();
  }

  return (
    <section className="min-h-screen py-20 bg-gray-50 islamic-border">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/#program"
            className="text-sm text-blue-700 hover:underline inline-flex items-center gap-1"
          >
            <i className="fas fa-arrow-left text-xs" /> Kembali ke Program
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
          {program.nama}
        </h1>

        {program.gambar_url?.startsWith("http") && (
          <div className="mb-8">
            <Image
              src={program.gambar_url}
              alt={program.nama}
              width={1000}
              height={500}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="prose max-w-none text-gray-800 text-lg leading-relaxed whitespace-pre-line">
          {program.deskripsi}
        </div>
      </div>
    </section>
  );
}
