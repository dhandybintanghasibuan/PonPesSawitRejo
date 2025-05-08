"use client";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { PiBookOpenTextFill } from "react-icons/pi"; // alternatif Quran icon


export default function TahfidzPage() {
  return (
    <main className="min-h-screen bg-[#f9fafb]">
      {/* Hero */}
      <section className="relative bg-[#0d4f9e] text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <PiBookOpenTextFill className="text-6xl mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Program Tahfidz Al-Qur&apos;an
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80">
            Menghafal Al-Qur&apos;an dengan metode efektif dan bimbingan
            langsung dari para hafidz/hafidzah.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20" />
      </section>

      {/* Konten Detail */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-8 border-l-8 border-[#0d4f9e]">
          <h2 className="text-2xl font-bold text-[#0d4f9e] mb-4">
            Fasilitas dan Metode
          </h2>
          <ul className="space-y-4">
            {[
              "Target hafalan 1–30 Juz",
              "Sistem muraja’ah harian",
              "Ujian setoran berkala",
              "Kelas privat & kelompok",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-800">
                <FaCheckCircle className="text-[#0d4f9e] mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gambar Tambahan */}
        <div className="mt-10 rounded-lg overflow-hidden shadow-md">
          <Image
            src="/assets/img/tahfidz.jpg"
            alt="Program Tahfidz"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>
    </main>
  );
}
