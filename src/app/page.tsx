"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import AboutSection from "../components/AboutSection";
import ProgramSection from "../components/ProgramSection";
import FacilitySection from "../components/FacilitySection";
import GallerySection from "../components/GallerySection";
import AchievementSection from "../components/AchievementSection";
import ContactSection from "../components/ContactSection";
import MapSection from "../components/MapSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50 navbar-animate">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/img/logopesantren.png"
              alt="Logo Pondok"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <div className="leading-tight">
              <h1 className="text-lg sm:text-xl font-bold text-green-800">
                Pondok Pesantren Sawit Rejo
              </h1>
              <p className="text-xs sm:text-sm text-amber-800 font-semibold">
                Kutalimbaru - Deli Serdang
              </p>
            </div>
          </div>
          <button
            id="menu-toggle"
            className="md:hidden text-amber-800 text-2xl focus:outline-none"
          >
            <i className="fas fa-bars"></i>
          </button>
          <nav className="hidden md:flex gap-6 font-medium text-amber-900">
            <a href="#beranda" className="hover:text-green-700 transition">
              Beranda
            </a>
            <a href="#about" className="hover:text-green-700 transition">
              Tentang
            </a>
            <a href="#program" className="hover:text-green-700 transition">
              Program
            </a>
            <a href="#fasilitas" className="hover:text-green-700 transition">
              Fasilitas
            </a>
            <a href="#galeri" className="hover:text-green-700 transition">
              Galeri
            </a>
            <a href="#kontak" className="hover:text-green-700 transition">
              Kontak
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative w-full h-screen min-h-[600px] overflow-hidden text-green-900"
      >
        <style>{`.fade-left { background: linear-gradient(to right, rgba(255, 250, 243, 0.95) 35%, rgba(255, 250, 243, 0.75) 60%, transparent 100%); backdrop-filter: blur(4px); }`}</style>
        <Image
          src="/assets/img/headerbg.png"
          alt="Santri"
          fill
          className="object-cover object-[40%] z-0"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/70 via-white/30 to-transparent backdrop-blur-sm" />
        <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
          <div className="w-full md:w-3/5 lg:w-1/2 bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg border border-amber-100">
            <div className="flex items-center mb-4">
              <div className="h-1 w-16 bg-amber-700 rounded-full" />
              <p className="mx-3 text-amber-800 font-medium">
                Pondok Pesantren
              </p>
              <div className="h-1 flex-grow bg-amber-700 rounded-full" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Sawit <span className="text-amber-700">Rejo</span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Membentuk Generasi{" "}
              <span className="text-amber-700">Qur&apos;ani</span>{" "}
              <span className="relative">
                Berakhlak Mulia
                <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 rounded-full" />
              </span>
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
                className="group bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-lg shadow hover:shadow-lg transition duration-300 flex items-center"
              >
                <i className="fas fa-book-open mr-2"></i>
                <span>Program Kami</span>
              </a>
              <a
                href="#contact"
                className="group bg-white hover:bg-gray-50 text-amber-800 font-bold py-3 px-6 rounded-lg shadow hover:shadow-lg transition duration-300 border border-amber-200 flex items-center"
              >
                <i className="fas fa-phone-alt mr-2"></i>
                <span>Hubungi Kami</span>
              </a>
            </div>
          </div>

          {/* Statistik */}
          <div className="hidden lg:flex absolute bottom-25 right-10 z-30">
            <div className="flex gap-6">
              <StatCard title="10+" subtitle="Tahun Mengabdi" />
              <StatCard title="70+" subtitle="Santri Aktif" />
              <StatCard title="100%" subtitle="Berbasis Al-Qur'an" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:block">
          <a
            href="#program"
            className="text-amber-800 hover:text-amber-700 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* === Tampilkan Section === */}
      <AboutSection />
      <ProgramSection />
      <FacilitySection />
      <GallerySection />
      <AchievementSection />
      <ContactSection />
      <MapSection />
      <Footer />
    </main>
  );
}

// Komponen kecil untuk statistik
function StatCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-md text-center">
      <h3 className="text-3xl font-bold text-amber-700">{title}</h3>
      <p className="text-sm text-green-900">{subtitle}</p>
    </div>
  );
}
