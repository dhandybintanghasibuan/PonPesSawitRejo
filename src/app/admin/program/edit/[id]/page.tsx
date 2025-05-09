"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { FaSave, FaArrowLeft } from "react-icons/fa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditProgramPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    nama: "",
    status: "Aktif",
    deskripsi: "",
    image_url: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      const { data, error } = await supabase
        .from("program")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setForm({
          nama: data.nama,
          status: data.status,
          deskripsi: data.deskripsi || "",
          image_url: data.image_url || "",
        });
      }

      setLoading(false);
    };

    if (id) fetchProgram();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedImageUrl = form.image_url;

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("program")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("❌ Gagal upload gambar: " + uploadError.message);
        return;
      }

      const { data: publicUrl } = supabase.storage
        .from("program")
        .getPublicUrl(fileName);
      uploadedImageUrl = publicUrl.publicUrl;
    }

    const { error } = await supabase
      .from("program")
      .update({
        nama: form.nama,
        status: form.status,
        deskripsi: form.deskripsi,
        image_url: uploadedImageUrl,
      })
      .eq("id", id);

    if (!error) {
      router.push("/admin/program");
    } else {
      alert("❌ Gagal menyimpan: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Memuat data program...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Edit Program</h1>
          <p className="text-sm text-gray-500 mt-1">
            Perbarui data program pendidikan pondok
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 font-medium px-4 py-2 rounded-md transition"
        >
          <FaArrowLeft /> Kembali
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6 max-w-2xl border border-gray-200 mx-auto"
      >
        <div className="grid gap-5">
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
              Status Program
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
              Upload Gambar (opsional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#0d4f9e] file:text-white file:rounded-md hover:file:bg-blue-800"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0d4f9e] text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-blue-900 transition"
          >
            <FaSave /> Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
