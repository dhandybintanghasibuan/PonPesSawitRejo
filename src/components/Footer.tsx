"use client";

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
              <a href="#" className="hover:text-amber-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-amber-400">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-amber-400">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Kolom 2 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              {[
                "Beranda",
                "Tentang",
                "Program",
                "Fasilitas",
                "Galeri",
                "Kontak",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="hover:text-amber-400 transition duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Program Unggulan</h3>
            <ul className="space-y-2">
              {[
                "Tahfidz Al-Qur'an",
                "Pendidikan Diniyah",
                "Sekolah Formal",
                "Bahasa Arab & Inggris",
                "Ekstrakurikuler",
              ].map((program) => (
                <li key={program}>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition duration-300"
                  >
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4 */}
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
                <span>(061) 1234-5678</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-amber-400"></i>
                <span>pesantrensawitrejo@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 text-center">
          <p>&copy; 2025 Pondok Pesantren Sawit Rejo. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
