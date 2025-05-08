"use client";
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pesan berhasil dikirim (simulasi).");
  };

  return (
    <section id="contact" className="py-16 bg-white islamic-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Silakan menghubungi kami untuk informasi lebih lanjut
          </p>
          <div className="w-24 h-1 bg-amber-700 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Info Kontak */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 space-y-6">
            <h3 className="text-2xl font-bold text-amber-800 mb-4">
              Informasi Kontak
            </h3>

            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <i className="fas fa-map-marker-alt text-amber-700"></i>
              </div>
              <p>
                Jl. Diski Glugur Kuta, Sawit Rejo, Kec. Kutalimbaru, Kab. Deli
                Serdang, Sumatera Utara
              </p>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <i className="fas fa-phone-alt text-amber-700"></i>
              </div>
              <p>(061) 1234-5678 | 0812-3456-7890 (WA)</p>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <i className="fas fa-envelope text-amber-700"></i>
              </div>
              <p>pesantrensawitrejo@gmail.com</p>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <i className="fas fa-clock text-amber-700"></i>
              </div>
              <p>
                Senin - Jumat: 08.00 - 16.00 WIB
                <br />
                Sabtu: 08.00 - 12.00 WIB
              </p>
            </div>
          </div>

          {/* Formulir Kontak */}
          <div className="md:w-1/2">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">
                Formulir Kontak
              </h3>
              <form onSubmit={handleSubmit}>
                {["name", "email", "phone"].map((field) => (
                  <div className="mb-4" key={field}>
                    <label
                      className="block text-gray-700 font-medium mb-2 capitalize"
                      htmlFor={field}
                    >
                      {field === "phone"
                        ? "Nomor Telepon"
                        : field === "name"
                        ? "Nama Lengkap"
                        : "Email"}
                    </label>
                    <input
                      id={field}
                      name={field}
                      value={form[field as keyof typeof form]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                ))}

                <div className="mb-4">
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Subjek
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Pilih subjek</option>
                    <option value="admisi">Informasi Pendaftaran</option>
                    <option value="program">Informasi Program</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded w-full"
                >
                  <i className="fas fa-paper-plane mr-2"></i> Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
