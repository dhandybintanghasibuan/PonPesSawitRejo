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
    <section id="gallery" className="py-16 bg-gray-50 islamic-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Galeri Kegiatan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Momen-momen berharga dalam kehidupan santri di Pondok Pesantren
            Sawit Rejo
          </p>
          <div className="w-24 h-1 bg-amber-700 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden shadow-md islamic-card hover-scale h-48"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                <span className="text-white font-medium">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded shadow hover:shadow-lg transition duration-300">
            Lihat Lebih Banyak <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
