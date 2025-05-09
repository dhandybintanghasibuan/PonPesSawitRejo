"use client";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { PiBookOpenTextFill } from "react-icons/pi";

export default function TahfidzPage() {
  return (
    <main className="min-h-screen bg-[#f9fafb]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0d4f9e] to-[#0f66b8] text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <PiBookOpenTextFill className="text-6xl mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Program Tahfidz Al-Qur&apos;an
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Menghafal Al-Qur&apos;an dengan metode efektif, lingkungan kondusif,
            dan bimbingan langsung dari para hafidz/hafidzah.
          </p>
        </div>
        {/* Dekorasi lengkung bawah */}
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

      {/* Detail Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Kartu Fasilitas */}
        <div className="bg-white rounded-xl shadow-lg border-l-8 border-[#0d4f9e] p-8 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-bold text-[#0d4f9e] mb-6">
            Fasilitas & Metode Unggulan
          </h2>
          <ul className="space-y-4 text-gray-700">
            {[
              "Target hafalan 1–30 Juz",
              "Sistem muraja’ah harian dan mingguan",
              "Ujian setoran berkala oleh pembina",
              "Kelas privat dan kelompok sesuai level",
              "Lingkungan Islami dan penuh motivasi",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaCheckCircle className="text-[#0d4f9e] mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gambar Program */}
        <div className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition duration-500">
          <Image
            src="/assets/img/tahfidz.jpg"
            alt="Santri Menghafal Al-Qur'an"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>
    </main>
  );
}
