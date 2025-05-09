"use client";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";

export default function FormalPage() {
  return (
    <main className="min-h-screen bg-[#f9fafb]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0d4f9e] to-[#1560bd] text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <PiStudentFill className="text-6xl mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Program Pendidikan Formal
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Pendidikan formal setingkat SMP, SMA, dan SMK dengan kurikulum
            nasional dan penguatan karakter Islami.
          </p>
        </div>

        {/* Wave transition bawah */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0">
          <svg
            className="relative block w-full h-[80px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#f9fafb"
              d="M0,288L48,272C96,256,192,224,288,192C384,160,480,128,576,112C672,96,768,96,864,122.7C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128V320H0Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Konten Utama */}
      <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Detail Box */}
        <div className="bg-white rounded-xl shadow-lg border-l-8 border-[#0d4f9e] p-8 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-bold text-[#0d4f9e] mb-6">
            Kurikulum & Keunggulan
          </h2>
          <ul className="space-y-4 text-gray-700">
            {[
              "Jenjang pendidikan SMP, SMA, dan SMK terakreditasi",
              "Kurikulum nasional berbasis Kurikulum Merdeka",
              "Penguatan mata pelajaran agama dan akhlak",
              "Ekstrakurikuler: Bahasa Arab, Inggris, Komputer, Pramuka",
              "Pembelajaran terintegrasi antara ilmu umum dan keislaman",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaCheckCircle className="text-[#0d4f9e] mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gambar Formal */}
        <div className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition duration-500">
          <Image
            src="/assets/img/formal.jpg"
            alt="Pendidikan Formal Santri"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>
    </main>
  );
}
