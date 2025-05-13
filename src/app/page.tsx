"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaClock, FaUserGraduate } from "react-icons/fa";
import { SiQuora } from "react-icons/si";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import AboutSection from "../components/AboutSection";
import NewsSection from "../components/NewsSection";
import ProgramSection from "../components/ProgramSection";
import FacilitySection from "../components/FacilitySection";
import GallerySection from "../components/GallerySection";
import AchievementSection from "../components/AchievementSection";
import ContactSection from "../components/ContactSection";
import MapSection from "../components/MapSection";
import Footer from "../components/Footer";

export default function Home() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowTopBtn(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <main className="text-gray-800 scroll-smooth">
      {/* Hero Section */}
      <section
        id="home"
        className="relative w-full h-screen min-h-[600px] text-green-900"
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/img/header1bg.jpg"
            alt="Santri"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent backdrop-blur-sm" />
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="w-full md:w-3/5 lg:w-1/2 bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg border border-amber-100">
            <div className="flex items-center mb-4">
              <div className="h-1 w-16 bg-[#0d4f9e] rounded-full" />
              <p className="mx-3 text-amber-800 font-medium">
                Pondok Pesantren
              </p>
              <div className="h-1 flex-grow bg-[#0d4f9e] rounded-full" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Sawit <span className="text-amber-700">Rejo</span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Membentuk Generasi{" "}
              <span className="text-amber-700">Qur&apos;ani</span>{" "}
              <span className="relative">Berakhlak Mulia</span>
            </h2>
            <p className="text-lg text-gray-800 mb-8 leading-relaxed">
              Pondok Pesantren Sawit Rejo menyelenggarakan pendidikan Islam
              terpadu yang mengintegrasikan ilmu agama dan umum dengan penekanan
              pada pembentukan akhlak mulia dan kepribadian yang berlandaskan
              Al-Qur&apos;an.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#program"
                className="group bg-[#0d4f9e] hover:bg-[#0a5c91] text-white font-bold py-3 px-6 rounded-lg shadow hover:shadow-lg transition duration-300 flex items-center"
              >
                <i className="fas fa-book-open mr-2"></i>
                <span>Program Kami</span>
              </a>
              <a
                href="#kontak"
                className="group bg-white hover:bg-gray-50 text-[#0d4f9e] font-bold py-3 px-6 rounded-lg shadow hover:shadow-lg transition duration-300 border border-[#0d4f9e]/20 flex items-center"
              >
                <i className="fas fa-phone-alt mr-2"></i>
                <span>Hubungi Kami</span>
              </a>
            </div>
          </div>

          {/* Statistik */}
          <div className="hidden lg:flex absolute bottom-32 right-10 z-30">
            <div className="flex gap-5">
              <StatBox
                icon="hourglass-half"
                value="10+"
                label="Tahun Mengabdi"
              />
              <StatBox icon="users" value="70+" label="Santri Aktif" />
              <StatBox
                icon="book-quran"
                value="100%"
                label="Berbasis Al-Qur'an"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section lainnya */}
      <section id="about" className="min-h-screen">
        <AboutSection />
      </section>
      <section id="news" className="min-h-screen">
        <NewsSection />
      </section>
      <section id="program" className="min-h-screen">
        <ProgramSection />
      </section>
      <section id="fasilitas" className="min-h-screen">
        <FacilitySection />
      </section>
      <section id="galeri" className="min-h-screen">
        <GallerySection />
      </section>
      <section id="prestasi" className="min-h-screen">
        <AchievementSection />
      </section>
      <section id="kontak" className="min-h-screen">
        <ContactSection />
      </section>
      <section id="map">
        <MapSection />
      </section>

      {/* Footer dengan ref */}
      <footer ref={footerRef}>
        <Footer />
      </footer>

      {/* Tombol Kembali ke Atas */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#0d4f9e] text-white text-lg shadow-lg hover:bg-[#093d78] transition duration-300 flex items-center justify-center"
          aria-label="Kembali ke atas"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </main>
  );
}

function StatBox({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg rounded-2xl shadow-xl px-5 py-4 border border-[#0d4f9e]/20 hover:scale-105 transition-all duration-300 flex items-center gap-4">
      <div className="bg-[#0d4f9e]/10 text-[#0d4f9e] p-3 rounded-full text-xl">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <div>
        <h4 className="text-xl font-extrabold text-green-800">{value}</h4>
        <p className="text-xs text-gray-700">{label}</p>
      </div>
    </div>
  );
}
