// app/program/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ProgramDetailPage({ params }: PageProps) {
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
    <section className="py-20 bg-gray-50 min-h-screen islamic-border">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/#program"
            className="text-sm text-blue-700 hover:underline inline-flex items-center gap-1"
          >
            <i className="fas fa-arrow-left text-xs" />
            Kembali ke Program
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-4">{program.nama}</h1>
        {program.gambar_url && (
          <Image
            src={program.gambar_url}
            alt={program.nama}
            width={800}
            height={400}
            className="rounded-lg mb-6"
          />
        )}
        <p className="text-lg text-gray-700 whitespace-pre-line">
          {program.deskripsi}
        </p>
      </div>
    </section>
  );
}
