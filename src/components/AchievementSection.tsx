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
    <section className="py-16 bg-[#f8f5ee] islamic-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Prestasi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Capaian dan keberhasilan yang telah diraih santri Pondok Pesantren
            Sawit Rejo
          </p>
          <div className="w-24 h-1 bg-amber-700 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg islamic-card hover-scale"
            >
              <div className="mb-4">
                <h4 className="font-bold text-green-900 text-xl">
                  {item.title}
                </h4>
                <p className="text-sm text-amber-700 mt-1">{item.by}</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
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
