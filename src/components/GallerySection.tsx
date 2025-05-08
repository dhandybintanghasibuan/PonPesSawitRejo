"use client";
import { FC } from "react";
import Image from "next/image";

const galleryItems = [
  {
    src: "/assets/img/galeri.jpg",
    alt: "Kegiatan Tahfidz",
    label: "Kegiatan Tahfidz",
  },
  {
    src: "/assets/img/galeri.jpg",
    alt: "Pengajian Kitab",
    label: "Pengajian Kitab",
  },
  {
    src: "/assets/img/galeri.jpg",
    alt: "Pelajaran Sekolah",
    label: "Pelajaran Sekolah",
  },
  {
    src: "/assets/img/galeri.jpg",
    alt: "Kegiatan Olahraga",
    label: "Kegiatan Olahraga",
  },
  {
    src: "/assets/img/galeri.jpg",
    alt: "Ekstrakurikuler",
    label: "Ekstrakurikuler",
  },
  {
    src: "/assets/img/galeri.jpg",
    alt: "Acara Tahunan",
    label: "Acara Tahunan",
  },
  {
    src: "/assets/img/galeri.jpg",
    alt: "Kegiatan Sosial",
    label: "Kegiatan Sosial",
  },
  {
    src: "/assets/img/galeri.jpg",
    alt: "Wisuda Santri",
    label: "Wisuda Santri",
  },
];

const GallerySection: FC = () => {
  return (
    <section
      id="galeri"
      className="min-h-screen py-20 bg-white islamic-border flex items-center"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Galeri Kegiatan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Momen-momen berharga dalam kehidupan santri di Pondok Pesantren
            Sawit Rejo
          </p>
          <div className="w-24 h-1 bg-[#0d4f9e] mx-auto mt-4" />
        </div>

        {/* Galeri Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-lg overflow-hidden shadow-sm border border-[#0d4f9e]/20 hover:shadow-md transition duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                <span className="text-white text-sm font-semibold tracking-wide px-3 text-center">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-10">
          <button className="bg-[#0d4f9e] hover:bg-[#093e7a] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            Lihat Lebih Banyak <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
