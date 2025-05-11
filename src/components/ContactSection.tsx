"use client";
import { useState } from "react";
import { sendContact } from "../action/sendContact";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await sendContact({
      nama: form.name,
      email: form.email,
      pesan: `Telp: ${form.phone}\nSubjek: ${form.subject}\n\n${form.message}`,
    });

    if (res.success) {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } else {
      console.error("❌ Error Supabase:", res.error);
      setStatus("error");
    }
  };

  return (
    <section id="kontak" className="py-20 bg-white islamic-border">
      <div className="container mx-auto px-4">
        {/* Judul */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Silakan hubungi kami untuk pertanyaan atau informasi lebih lanjut.
          </p>
          <div className="w-24 h-1 bg-[#0d4f9e] mx-auto mt-4" />
        </div>

        {/* Kotak Gabungan */}
        <div className="bg-white rounded-xl border border-[#0d4f9e]/30 shadow-lg p-8 md:flex gap-8">
          {/* Info Kontak */}
          <div className="md:w-1/2 space-y-6 mb-10 md:mb-0">
            <h3 className="text-xl font-bold text-[#0d4f9e] mb-4">
              Informasi Kontak
            </h3>
            {[
              {
                icon: "map-marker-alt",
                text: "Jl. Diski Glugur Kuta, Sawit Rejo, Kutalimbaru, Deli Serdang",
              },
              {
                icon: "phone-alt",
                text: "0821-6653-5542",
              },
              {
                icon: "envelope",
                text: "pesantrensawitrejo@gmail.com",
              },
              {
                icon: "clock",
                text: (
                  <>
                    Senin - Jumat: 08.00 - 16.00 WIB <br /> Sabtu: 08.00 - 12.00
                    WIB
                  </>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="bg-[#e0ecf9] p-3 rounded-full min-w-[44px] h-[44px] flex items-center justify-center">
                  <i
                    className={`fas fa-${item.icon} text-[#0d4f9e] text-lg`}
                  ></i>
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Formulir Kontak */}
          <div className="md:w-1/2">
            <div className="bg-[#f6f9fd] p-4 rounded-lg shadow-md border border-[#0d4f9e]/20 w-full">
              <h3 className="text-base font-bold text-[#0d4f9e] mb-3">
                Formulir Kontak
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                {["name", "email", "phone"].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-gray-700 mb-1 capitalize"
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
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0d4f9e] focus:outline-none"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-1">
                    Subjek
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0d4f9e] focus:outline-none"
                  >
                    <option value="">Pilih subjek</option>
                    <option value="admisi">Informasi Pendaftaran</option>
                    <option value="program">Informasi Program</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-1">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={2}
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0d4f9e] focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#0d4f9e] hover:bg-[#093e7a] text-white font-bold py-2 rounded-md transition duration-300"
                >
                  {status === "loading" ? (
                    "Mengirim..."
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i> Kirim Pesan
                    </>
                  )}
                </button>

                {status === "success" && (
                  <p className="mt-1 text-green-600 text-center">
                    Pesan berhasil dikirim!
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-1 text-red-600 text-center">
                    Terjadi kesalahan. Silakan coba lagi.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
  