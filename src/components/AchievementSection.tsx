"use client";
import { FC } from "react";

const achievements = [
  {
    title: "Juara 1 MTQ Tingkat Kabupaten",
    by: "Oleh: M. Zaidan (Santri Kelas 11)",
    description:
      "Dalam lomba Musabaqah Tilawatil Qur’an tingkat Kabupaten Deli Serdang 2024, Zaidan berhasil menjadi juara pertama dalam kategori tilawah remaja.",
  },
  {
    title: "100% Lulus Ujian Tahfidz",
    by: "Angkatan 2023",
    description:
      "Seluruh santri kelas akhir tahun ajaran 2022/2023 dinyatakan lulus ujian tahfidz 5–30 juz dengan predikat Mumtaz dan Jayyid Jiddan.",
  },
  {
    title: "Peringkat 1 Lomba Cerdas Cermat",
    by: "Tingkat Provinsi Sumatera Utara",
    description:
      "Tim santri putri berhasil meraih juara pertama dalam lomba Cerdas Cermat Pendidikan Islam antar pondok pesantren se-Sumatera Utara tahun 2023.",
  },
];

const AchievementSection: FC = () => {
  return (
    <section
      id="achievement"
      className="min-h-screen py-20 bg-white islamic-border flex items-center"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Prestasi Santri
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Capaian membanggakan yang diraih oleh para santri Pondok Pesantren
            Sawit Rejo.
          </p>
          <div className="w-24 h-1 bg-[#0d4f9e] mx-auto mt-4" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white via-blue-50 to-white border border-[#0d4f9e]/30 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">
                <h4 className="text-lg md:text-xl font-bold text-green-900">
                  {item.title}
                </h4>
                <p className="text-sm text-[#0d4f9e] italic mt-1">{item.by}</p>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed tracking-wide">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;
