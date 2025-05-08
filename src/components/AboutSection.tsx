"use client";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white islamic-border">
      <div className="container mx-auto px-4">
        {/* Judul */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Tentang Kami
          </h2>
          <div className="w-24 h-1 bg-amber-700 mx-auto" />
        </div>

        {/* Konten Utama */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Gambar */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="relative rounded-lg overflow-hidden shadow-lg islamic-card hover-scale">
              <Image
                src="/assets/img/pondok1.jpg"
                alt="Tentang Pondok"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Deskripsi dan Visi Misi */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-amber-800 mb-4">
              Sejarah Pondok Pesantren Sawit Rejo
            </h3>
            <p className="text-gray-700 mb-4">
              Pondok Pesantren Sawit Rejo didirikan pada tahun 2011 dengan
              tujuan mencetak generasi Qur&apos;ani yang berakhlak mulia dan
              bermanfaat bagi umat.
            </p>
            <p className="text-gray-700 mb-6">
              Dengan sistem pendidikan terpadu yang menggabungkan kurikulum
              pesantren salaf dan modern, kami berkomitmen untuk membentuk
              santri yang menguasai ilmu agama sekaligus ilmu umum.
            </p>

            {/* Visi & Misi dalam Kotak */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Visi */}
              <div className="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-700 shadow">
                <h4 className="font-bold text-green-900 mb-3">
                  <i className="fas fa-eye text-amber-700 mr-2" />
                  VISI
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Mewujudkan{" "}
                  <span className="font-bold text-amber-700">Generus</span> yang{" "}
                  <span className="font-bold text-green-800">Intelektual</span>,{" "}
                  <span className="font-bold text-green-800">Religius</span>,
                  dan{" "}
                  <span className="font-bold text-green-800">Profesional</span>.
                </p>
              </div>

              {/* Misi */}
              <div className="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-700 shadow">
                <h4 className="font-bold text-green-900 mb-3">
                  <i className="fas fa-bullseye text-amber-700 mr-2" />
                  MISI
                </h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
                  <li>
                    Membentuk siswa{" "}
                    <span className="font-bold">berakhlakul karimah</span>,
                    berbudi luhur, <span className="italic">islami</span>,
                    tertib dan disiplin.
                  </li>
                  <li>
                    Meningkatkan{" "}
                    <span className="font-bold">intelektualitas siswa</span>{" "}
                    melalui peningkatan prestasi akademik.
                  </li>
                  <li>
                    Membangun siswa yang{" "}
                    <span className="font-bold">mandiri</span> melalui
                    pembekalan <span className="italic">life skill</span>,
                    keterampilan dan bahasa.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
