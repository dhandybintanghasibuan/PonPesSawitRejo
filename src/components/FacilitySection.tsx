"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const facilities = [
  {
    slug: "masjid",
    icon: "fa-mosque",
    title: "Masjid",
    desc: "Masjid besar dengan kapasitas 500 jamaah untuk shalat berjamaah dan kegiatan ibadah lainnya.",
    image: "/assets/fasilitas/masjid.jpg",
  },
  {
    slug: "asrama",
    icon: "fa-home",
    title: "Asrama",
    desc: "Asrama nyaman dengan kapasitas 20 santri per kamar, dilengkapi lemari dan meja belajar.",
    image: "/assets/fasilitas/asrama.jpg",
  },
  {
    slug: "kantin",
    icon: "fa-utensils",
    title: "Kantin & Dapur",
    desc: "Kantin sehat menyediakan makanan halal dan bergizi untuk kebutuhan santri.",
    image: "/assets/fasilitas/kantin.jpg",
  },
  {
    slug: "perpustakaan",
    icon: "fa-book",
    title: "Perpustakaan",
    desc: "Perpustakaan lengkap dengan koleksi buku agama, umum, dan referensi pendidikan.",
    image: "/assets/fasilitas/perpustakaan.jpg",
  },
  {
    slug: "lab-komputer",
    icon: "fa-laptop",
    title: "Lab Komputer",
    desc: "Laboratorium komputer dengan 30 unit PC untuk pembelajaran teknologi informasi.",
    image: "/assets/fasilitas/lab-komputer.jpg",
  },
  {
    slug: "lapangan",
    icon: "fa-basketball-ball",
    title: "Lapangan Olahraga",
    desc: "Lapangan serbaguna untuk futsal, basket, voli, dan kegiatan olahraga lainnya.",
    image: "/assets/img/fasilitas/lapangan.jpg",
  },
  {
    slug: "klinik",
    icon: "fa-clinic-medical",
    title: "Klinik Kesehatan",
    desc: "Klinik dengan dokter jaga dan perawat untuk penanganan kesehatan santri.",
    image: "/assets/fasilitas/klinik.jpg",
  },
  {
    slug: "blkk",
    title: "Balai Latihan Kerja Komunitas",
    desc: "Tempat pelatihan kerja untuk sertifikasi potensi dunia industri",
    image: "/assets/img/fasilitas/blk.jpg",
    iconImage: "/assets/img/kemnaker.png",
  },
];

const FacilitySection: FC = () => {
  return (
    <section
      id="fasilitas"
      className="min-h-screen py-20 bg-white islamic-border flex items-center"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Fasilitas Pesantren
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fasilitas lengkap untuk mendukung kegiatan belajar mengajar dan
            kehidupan santri
          </p>
          <div className="w-24 h-1 bg-[#0d4f9e] mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((item, i) => (
            <Link
              key={i}
              href={`/fasilitas/${item.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-md border border-[#0d4f9e]/30 hover:shadow-xl transition duration-300"
            >
              {/* Gambar Atas */}
              <div className="h-40 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Isi */}
              <div className="p-5 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-[#0d4f9e]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    {item.iconImage ? (
                      <Image
                        src={item.iconImage}
                        alt={item.title}
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <i
                        className={`fas ${item.icon} text-[#0d4f9e] text-lg`}
                      />
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitySection;
