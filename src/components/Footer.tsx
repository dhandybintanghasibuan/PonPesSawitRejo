"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Kolom 1 */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Pondok Pesantren Sawit Rejo
            </h3>
            <p className="mb-4">
              Membentuk generasi Qur&apos;ani yang berakhlak mulia, berwawasan
              luas, dan bermanfaat bagi umat.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/generus.bangsa?igsh=MTA2bDllNGprNWY2eQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://youtube.com/@ldiitv?si=nJx7jdm2yj_tEuJ0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Kolom 2 - Tautan Cepat */}
          <div>
            <h3 className="text-xl font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              {[
                { label: "Beranda", href: "/" },
                { label: "Tentang", href: "#about" },
                { label: "Berita", href: "#berita" },
                { label: "Program", href: "#program" },
                { label: "Fasilitas", href: "#fasilitas" },
                { label: "Galeri", href: "#galeri" },
                { label: "Prestasi", href: "#prestasi" },
                { label: "Kontak", href: "#kontak" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-amber-400 transition duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3 - Program Unggulan */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              Program Lainnya
            </h3>
            <ul className="space-y-2 text-white">
              {[
                { label: "Ekstrakurikuler", slug: "/ekstrakurikuler" },
              ].map((program) => (
                <li key={program.slug}>
                  <Link
                    href={program.slug}
                    className="hover:text-amber-300 transition duration-300"
                  >
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4 - Kontak */}
          <div>
            <h3 className="text-xl font-bold mb-4">Kontak Kami</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-amber-400"></i>
                <span>
                  Jl. Diski Glugur Kuta, Sawit Rejo, Kec. Kutalimbaru, Kab. Deli
                  Serdang, Sumatera Utara
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-amber-400"></i>
                <span>0821-6653-5542</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-amber-400"></i>
                <span>pesantrensawitrejo@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 text-center">
          <p>&copy; 2025 Pondok Pesantren Sawit Rejo.</p>
        </div>
      </div>
    </footer>
  );
}
