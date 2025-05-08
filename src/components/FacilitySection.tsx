"use client";
import { FC } from "react";

const facilities = [
  {
    icon: "fa-mosque",
    title: "Masjid",
    desc: "Masjid besar dengan kapasitas 500 jamaah untuk shalat berjamaah dan kegiatan ibadah lainnya.",
    image: "/assets/fasilitas/masjid.jpg",
  },
  {
    icon: "fa-home",
    title: "Asrama",
    desc: "Asrama nyaman dengan kapasitas 20 santri per kamar, dilengkapi lemari dan meja belajar.",
    image: "/assets/fasilitas/asrama.jpg",
  },
  {
    icon: "fa-utensils",
    title: "Kantin & Dapur",
    desc: "Kantin sehat menyediakan makanan halal dan bergizi untuk kebutuhan santri.",
    image: "/assets/fasilitas/kantin.jpg",
  },
  {
    icon: "fa-book",
    title: "Perpustakaan",
    desc: "Perpustakaan lengkap dengan koleksi buku agama, umum, dan referensi pendidikan.",
    image: "/assets/fasilitas/perpustakaan.jpg",
  },
  {
    icon: "fa-laptop",
    title: "Lab Komputer",
    desc: "Laboratorium komputer dengan 30 unit PC untuk pembelajaran teknologi informasi.",
    image: "/assets/fasilitas/lab-komputer.jpg",
  },
  {
    icon: "fa-basketball-ball",
    title: "Lapangan Olahraga",
    desc: "Lapangan serbaguna untuk futsal, basket, voli, dan kegiatan olahraga lainnya.",
    image: "/assets/img/fasilitas/lapangan.jpg",
  },
  {
    icon: "fa-clinic-medical",
    title: "Klinik Kesehatan",
    desc: "Klinik dengan dokter jaga dan perawat untuk penanganan kesehatan santri.",
    image: "/assets/fasilitas/klinik.jpg",
  },
  {
    icon: "fa-water",
    title: "Kolam Renang",
    desc: "Kolam renang khusus untuk santri putra dan putri dengan jadwal terpisah.",
    image: "/assets/fasilitas/kolam-renang.jpg",
  },
];


const FacilitySection: FC = () => {
  return (
    <section id="facility" className="py-16 bg-white islamic-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Fasilitas Pesantren
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fasilitas lengkap untuk mendukung kegiatan belajar mengajar dan
            kehidupan santri
          </p>
          <div className="w-24 h-1 bg-amber-700 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg p-6 text-center islamic-card hover-scale"
            >
              <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <i className={`fas ${item.icon} text-amber-700 text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitySection;
