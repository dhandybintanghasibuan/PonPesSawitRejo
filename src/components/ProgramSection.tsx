"use client";
import Image from "next/image";

export default function ProgramSection() {
  return (
    <section id="program" className="py-16 bg-gray-50 islamic-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Program Pendidikan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berbagai program unggulan untuk membentuk generasi Qur&apos;ani yang
            berakhlak mulia
          </p>
          <div className="w-24 h-1 bg-amber-700 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Program Card */}
          {[
            {
              title: "Tahfidz Al-Qur'an",
              desc: "Program menghafal Al-Qur'an dengan metode yang efektif dan terstruktur, dibimbing oleh hafidz/hafidzah berpengalaman.",
              icon: "fa-book-quran",
              items: [
                "Target hafalan 1-30 juz",
                "Sistem muraja'ah harian",
                "Ujian setoran berkala",
              ],
            },
            {
              title: "Pendidikan Diniyah",
              desc: "Pendidikan agama Islam komprehensif meliputi Aqidah, Fiqh, Akhlak, Hadits, Sirah Nabawiyah, dan Bahasa Arab.",
              icon: "fa-graduation-cap",
              items: [
                "Kitab-kitab klasik dan kontemporer",
                "Sistem bandongan dan sorogan",
                "Ujian semesteran",
              ],
            },
            {
              title: "Sekolah Formal",
              desc: "Pendidikan formal setara SD, SMP, dan SMA dengan kurikulum nasional yang diperkaya dengan nilai-nilai Islam.",
              icon: "fa-school",
              items: [
                "Kurikulum nasional plus",
                "Guru-guru berkualitas",
                "Fasilitas lengkap",
              ],
            },
          ].map((program, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg overflow-hidden shadow-lg islamic-card hover-scale"
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src="/assets/img/tahfidz quran.webp"
                  alt={program.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <i
                      className={`fas ${program.icon} text-amber-700 text-xl`}
                    ></i>
                  </div>
                  <h3 className="text-xl font-bold text-green-900">
                    {program.title}
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">{program.desc}</p>
                <ul className="text-gray-600 text-sm space-y-2">
                  {program.items.map((item, i) => (
                    <li key={i}>
                      <i className="fas fa-check-circle text-amber-700 mr-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
