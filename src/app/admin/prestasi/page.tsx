"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Prestasi = {
  id: string;
  judul: string;
  deskripsi: string;
  gambar_url?: string;
  created_at?: string;
};

export default function AdminPrestasiPage() {
  const [data, setData] = useState<Prestasi[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<Prestasi>({
    id: "",
    judul: "",
    deskripsi: "",
    gambar_url: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("prestasi")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setData(data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File) => {
    const filename = `${uuidv4()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage
      .from("prestasi-images")
      .upload(filename, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("prestasi-images")
      .getPublicUrl(filename);

    return data.publicUrl;
  };

  const handleSubmit = async () => {
    if (!formData.judul || !formData.deskripsi) return;

    let imageUrl = formData.gambar_url;

    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile);
      } catch {
        alert("Upload gambar gagal");
        return;
      }
    }

    const payload = {
      judul: formData.judul,
      deskripsi: formData.deskripsi,
      gambar_url: imageUrl,
    };

    let error;

    if (editingId) {
      const { error: updateError } = await supabase
        .from("prestasi")
        .update(payload)
        .eq("id", editingId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("prestasi").insert([
        {
          ...payload,
          id: uuidv4(),
          created_at: new Date().toISOString(),
        },
      ]);
      error = insertError;
    }

    if (error) {
      alert("Gagal menyimpan: " + error.message);
    } else {
      resetForm();
      fetchData();
    }
  };

  const handleEdit = (item: Prestasi) => {
    setFormData(item);
    setEditingId(item.id);
    setFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("prestasi").delete().eq("id", id);
    fetchData();
  };

  const resetForm = () => {
    setFormData({
      id: "",
      judul: "",
      deskripsi: "",
      gambar_url: "",
    });
    setEditingId(null);
    setImageFile(null);
    setFormVisible(false);
  };

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-900">Kelola Prestasi</h2>
        <button
          onClick={() => {
            resetForm();
            setFormVisible(!formVisible);
          }}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 flex items-center gap-2"
        >
          <FaPlus /> Tambah Prestasi
        </button>
      </div>

      {formVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <input
            type="text"
            name="judul"
            placeholder="Judul Prestasi"
            value={formData.judul}
            onChange={handleChange}
            className="w-full p-2 border mb-4 rounded"
          />
          <textarea
            name="deskripsi"
            placeholder="Deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="w-full p-2 border mb-4 rounded"
            rows={3}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border mb-4 rounded"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
          >
            {editingId ? "Perbarui" : "Tambah"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Gambar</th>
              <th className="px-6 py-4">Judul</th>
              <th className="px-6 py-4">Deskripsi</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">
                  {item.gambar_url ? (
                    <img
                      src={item.gambar_url}
                      alt="preview"
                      className="w-14 h-14 object-cover rounded border"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      -
                    </div>
                  )}
                </td>
                <td className="px-6 py-3 font-medium text-gray-900">
                  {item.judul}
                </td>
                <td className="px-6 py-3 max-w-sm">{item.deskripsi}</td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                    >
                      <FaTrash /> Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
