"use client";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen py-20 bg-white islamic-border flex items-center"
    >
      <div className="container mx-auto px-4">
        {/* Judul */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Tentang Kami
          </h2>
          <div className="w-24 h-1 bg-[#0d4f9e] mx-auto" />
        </div>

        {/* Konten Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Gambar */}
          <div className="w-full">
            <div className="relative overflow-hidden rounded-xl border border-[#0d4f9e] shadow-xl hover:shadow-2xl hover:ring-2 hover:ring-[#0d4f9e] transition duration-300">
              <Image
                src="/assets/img/tentangkami.jpg"
                alt="Tentang Pondok"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div className="w-full">
            <h3 className="text-2xl font-bold text-amber-800 mb-4">
              Sejarah Pondok Pesantren Sawit Rejo
            </h3>
            <p className="text-gray-700 mb-3 leading-relaxed text-justify">
              Pondok Pesantren Sawit Rejo didirikan pada tahun 2011 dengan visi
              menjadi pusat pendidikan Islam yang melahirkan generasi Qur’ani
              yang cerdas, berakhlak mulia, serta mampu menjawab tantangan
              zaman.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed text-justify">
              Dengan mengintegrasikan kurikulum salaf dan modern, santri tidak
              hanya dibekali ilmu agama, tetapi juga ilmu pengetahuan umum,
              teknologi, dan keterampilan hidup (life skill) untuk menjadi
              pribadi yang bermanfaat bagi umat.
            </p>

            {/* Visi Misi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Visi */}
              <div className="bg-[#e6f0fa] p-5 rounded-lg border-l-4 border-[#0d4f9e] shadow">
                <h4 className="font-bold text-green-900 mb-2">
                  <i className="fas fa-eye text-[#0d4f9e] mr-2" />
                  VISI
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Mewujudkan{" "}
                  <span className="font-semibold text-[#0d4f9e]">Generus</span>{" "}
                  yang{" "}
                  <span className="font-semibold text-green-800">
                    Intelektual
                  </span>
                  ,{" "}
                  <span className="font-semibold text-green-800">Religius</span>
                  , dan{" "}
                  <span className="font-semibold text-green-800">
                    Profesional
                  </span>
                  .
                </p>
              </div>

              {/* Misi */}
              <div className="bg-[#e6f0fa] p-5 rounded-lg border-l-4 border-[#0d4f9e] shadow">
                <h4 className="font-bold text-green-900 mb-2">
                  <i className="fas fa-bullseye text-[#0d4f9e] mr-2" />
                  MISI
                </h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
                  <li>
                    Membentuk siswa{" "}
                    <span className="font-bold">berakhlakul karimah</span> yang
                    islami dan disiplin.
                  </li>
                  <li>
                    Meningkatkan{" "}
                    <span className="font-bold">
                      intelektualitas dan prestasi akademik
                    </span>
                    .
                  </li>
                  <li>
                    Menanamkan{" "}
                    <span className="font-bold">
                      kemandirian dan keterampilan
                    </span>{" "}
                    melalui kegiatan ekstrakurikuler dan pelatihan.
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
