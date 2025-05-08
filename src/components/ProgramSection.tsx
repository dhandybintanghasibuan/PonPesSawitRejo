"use client";
import Image from "next/image";
import Link from "next/link";

export default function ProgramSection() {
  const programs = [
    {
      slug: "tahfidz",
      title: "Tahfidz Al-Qur'an",
      desc: "Program menghafal Al-Qur'an dengan metode yang efektif dan terstruktur, dibimbing oleh hafidz/hafidzah berpengalaman.",
      icon: "fa-book-quran",
      image: "/assets/img/tahfidz.jpg",
      items: [
        "Target hafalan 1-30 juz",
        "Sistem muraja'ah harian",
        "Ujian setoran berkala",
      ],
    },
    {
      slug: "diniyah",
      title: "Pendidikan Diniyah",
      desc: "Pendidikan agama Islam komprehensif meliputi Aqidah, Fiqh, Akhlak, Hadits, Sirah Nabawiyah, dan Bahasa Arab.",
      icon: "fa-graduation-cap",
      image: "/assets/img/program/diniyah.png",
      items: ["Tafsir Al-Qur'an", "Tafsir Al-Hadits", "Ujian semester"],
    },
    {
      slug: "formal",
      title: "Sekolah Formal",
      desc: "Pendidikan formal setara SMP, SMA, SMK dengan kurikulum merdeka",
      icon: "fa-school",
      image: "/assets/img/program/formal.png",
      items: [
        "Kurikulum Merdeka",
        "Guru-guru berkualitas",
        "Fasilitas lengkap",
      ],
    },
  ];

  return (
    <section
      id="program"
      className="min-h-screen py-20 bg-gray-50 islamic-border flex items-center"
    >
      <div className="container mx-auto px-4">
        {/* Judul */}
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

        {/* Kartu Program */}
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, idx) => (
            <Link
              href={`/program/${program.slug}`}
              key={idx}
              className="group transition-transform transform hover:scale-[1.02]"
            >
              <div className="bg-white rounded-xl overflow-hidden border border-[#0d4f9e] shadow-[0_4px_20px_rgba(13,79,158,0.1)] group-hover:shadow-[0_6px_30px_rgba(13,79,158,0.15)] h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    width={600}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#0d4f9e]/10 p-3 rounded-full mr-4">
                      <i
                        className={`fas ${program.icon} text-[#0d4f9e] text-xl`}
                      ></i>
                    </div>
                    <h3 className="text-xl font-bold text-green-900">
                      {program.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 text-sm mb-4 flex-1 leading-relaxed">
                    {program.desc}
                  </p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    {program.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <i className="fas fa-check-circle text-[#0d4f9e] mr-2 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
