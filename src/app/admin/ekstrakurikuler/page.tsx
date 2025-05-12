"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaTrash } from "react-icons/fa";

type Ekstrakurikuler = {
  id: string;
  nama: string;
  deskripsi: string;
  gambar_url?: string;
};

export default function AdminEkstrakurikulerPage() {
  const [items, setItems] = useState<Ekstrakurikuler[]>([]);
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambarFile, setGambarFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("ekstrakurikuler")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data || []);
  };

  const resetForm = () => {
    setNama("");
    setDeskripsi("");
    setGambarFile(null);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedUrl = "";

    // Upload gambar jika ada
    if (gambarFile) {
      const fileExt = gambarFile.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from("ekstrakurikuler-images")
        .upload(fileName, gambarFile);

      if (error) {
        alert("Gagal mengunggah gambar");
        return;
      }

      const { data: urlData } = supabase.storage
        .from("ekstrakurikuler-images")
        .getPublicUrl(fileName);

      uploadedUrl = urlData?.publicUrl || "";
    }

    if (editingId) {
      await supabase
        .from("ekstrakurikuler")
        .update({
          nama,
          deskripsi,
          ...(uploadedUrl && { gambar_url: uploadedUrl }),
        })
        .eq("id", editingId);
    } else {
      await supabase.from("ekstrakurikuler").insert([
        {
          id: uuidv4(),
          nama,
          deskripsi,
          gambar_url: uploadedUrl || "",
        },
      ]);
    }

    fetchItems();
    resetForm();
  };

  const handleEdit = (item: Ekstrakurikuler) => {
    setEditingId(item.id);
    setNama(item.nama);
    setDeskripsi(item.deskripsi);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Yakin ingin menghapus item ini?");
    if (!confirm) return;
    await supabase.from("ekstrakurikuler").delete().eq("id", id);
    fetchItems();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#0d4f9e] mb-6">
        Manajemen Ekstrakurikuler
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-10 space-y-4 border border-gray-100"
      >
        <h2 className="text-lg font-semibold">
          {editingId ? "Edit Kegiatan" : "Tambah Kegiatan"}
        </h2>
        <input
          type="text"
          placeholder="Nama Kegiatan"
          className="w-full border rounded-md px-4 py-2"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <textarea
          placeholder="Deskripsi"
          className="w-full border rounded-md px-4 py-2"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setGambarFile(e.target.files?.[0] || null)}
          className="w-full border rounded-md px-4 py-2"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-[#0d4f9e] text-white px-4 py-2 rounded-md hover:bg-blue-900"
          >
            {editingId ? "Simpan Perubahan" : "Tambah"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-500 hover:underline"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Grid Item */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-lg overflow-hidden border border-gray-100"
          >
            <div className="relative w-full h-48">
              <Image
                src={item.gambar_url || "/assets/img/default.jpg"}
                alt={item.nama}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-[#0d4f9e]">{item.nama}</h3>
              <p className="text-sm text-gray-700">{item.deskripsi}</p>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
