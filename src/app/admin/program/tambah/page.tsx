"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { FaArrowLeft, FaSave } from "react-icons/fa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TambahProgramPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: "",
    status: "Aktif",
    deskripsi: "",
  });
  const [gambar, setGambar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = async (): Promise<string | null> => {
    if (!gambar) return null;
    const fileName = `${Date.now()}-${gambar.name}`;
    const { data, error } = await supabase.storage
      .from("program")
      .upload(fileName, gambar);

    if (error) {
      alert("Gagal upload gambar: " + error.message);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("program")
      .getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const imageUrl = await handleUpload();
    if (!imageUrl && gambar) {
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("program").insert([
      {
        nama: form.nama,
        status: form.status,
        deskripsi: form.deskripsi,
        gambar_url: imageUrl,
      },
    ]);

    setLoading(false);
    if (!error) {
      router.push("/admin/program");
    } else {
      alert("❌ Gagal menyimpan: " + error.message);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tambah Program</h1>
          <p className="text-sm text-gray-500 mt-1">
            Masukkan data program pendidikan baru
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 font-medium px-4 py-2 rounded-md transition"
        >
          <FaArrowLeft />
          <span>Kembali</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6 max-w-2xl border border-gray-200 mx-auto space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Program
          </label>
          <input
            type="text"
            name="nama"
            required
            value={form.nama}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-[#0d4f9e]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-[#0d4f9e]"
          >
            <option value="Aktif">Aktif</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi Program
          </label>
          <textarea
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            rows={4}
            className="w-full border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-[#0d4f9e]"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Gambar
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setGambar(e.target.files?.[0] || null)}
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0d4f9e] text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-blue-900 transition"
        >
          <FaSave />
          {loading ? "Menyimpan..." : "Simpan Program"}
        </button>
      </form>
    </div>
  );
}
