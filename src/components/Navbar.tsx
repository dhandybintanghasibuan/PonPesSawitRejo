"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const sections = [
  { name: "Tentang", href: "/#about", id: "about" },
  { name: "Berita", href: "/#berita", id: "news"},
  { name: "Program", href: "/#program", id: "program" },
  { name: "Fasilitas", href: "/#fasilitas", id: "fasilitas" },
  { name: "Galeri", href: "/#galeri", id: "galeri" },
  { name: "Prestasi", href: "/#prestasi", id:"prestasi"},
  { name: "Kontak", href: "/#kontak", id: "kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => {
        const scrollPos = window.scrollY + 120;
        for (const section of sections) {
          const el = document.getElementById(section.id);
          if (
            el &&
            el.offsetTop <= scrollPos &&
            el.offsetTop + el.offsetHeight > scrollPos
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setActiveSection("");
    }
  }, [pathname]);

  return (
    <header className="bg-green-900 shadow-md sticky top-0 z-50 navbar-animate">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/#home"
          scroll={true}
          className="flex items-center gap-3 hover:opacity-90 transition"
        >
          <Image
            src="/assets/img/logopesantren.png"
            alt="Logo Pondok"
            width={48}
            height={48}
            className="h-12 w-auto"
          />
          <div className="leading-tight">
            <h1 className="text-lg sm:text-xl font-bold text-white">
              Pondok Pesantren Sawit Rejo
            </h1>
            <p className="text-xs sm:text-sm text-amber-200 font-semibold">
              Kutalimbaru - Deli Serdang
            </p>
          </div>
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 font-medium text-white">
          {sections.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              scroll={true}
              className={`hover:text-amber-300 transition-all duration-200 ${
                activeSection === item.id ? "text-amber-400 font-bold" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-green-900 px-4 pb-4 border-t border-green-800">
          <nav className="flex flex-col space-y-2 font-medium text-white">
            {sections.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                scroll={true}
                onClick={() => setIsOpen(false)}
                className={`hover:text-amber-300 transition-all duration-200 ${
                  activeSection === item.id ? "text-amber-400 font-bold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
