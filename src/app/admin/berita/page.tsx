"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaTrash, FaPlus, FaThumbtack } from "react-icons/fa";
import Linkify from "linkify-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type NewsItem = {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  is_pinned?: boolean;
  created_at?: string;
};

const linkifyOptions = {
  target: "_blank",
  className: "text-blue-600 underline hover:text-blue-800",
};

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState<NewsItem>({
    id: "",
    title: "",
    content: "",
    image_url: "",
    is_pinned: false,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news")
      .select("id, title, content, image_url, created_at, is_pinned");

    if (error) {
      console.error("Gagal memuat berita:", error.message);
    } else {
      const normalizedData = (data || []).map((item) => ({
        ...item,
        is_pinned: item.is_pinned ?? false,
      }));

      normalizedData.sort((a, b) => {
        if (a.is_pinned === b.is_pinned) {
          return (
            new Date(b.created_at || "").getTime() -
            new Date(a.created_at || "").getTime()
          );
        }
        return a.is_pinned ? -1 : 1;
      });

      setNewsList(normalizedData);
    }
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

  const uploadImageToStorage = async (file: File) => {
    const filename = `${uuidv4()}-${file.name}`;
    const { error } = await supabase.storage
      .from("berita-images")
      .upload(filename, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("berita-images")
      .getPublicUrl(filename);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) return;

    let uploadedImageUrl = formData.image_url;

    if (imageFile) {
      try {
        uploadedImageUrl = await uploadImageToStorage(imageFile);
      } catch (err) {
        alert("Gagal upload gambar.");
        return;
      }
    }

    const payload = {
      title: formData.title,
      content: formData.content,
      image_url: uploadedImageUrl,
      is_pinned: formData.is_pinned || false,
    };

    let error;
    if (editingId) {
      const { error: updateError } = await supabase
        .from("news")
        .update(payload)
        .eq("id", editingId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("news").insert([
        {
          ...payload,
          id: uuidv4(),
          created_at: new Date().toISOString(),
        },
      ]);
      error = insertError;
    }

    if (error) {
      alert("Gagal menyimpan berita: " + error.message);
      return;
    }

    setFormData({
      id: "",
      title: "",
      content: "",
      image_url: "",
      is_pinned: false,
    });
    setImageFile(null);
    setEditingId(null);
    setFormVisible(false);
    fetchNews();
  };

  const handleEdit = (item: NewsItem) => {
    setFormData({
      id: item.id,
      title: item.title,
      content: item.content,
      image_url: item.image_url || "",
      is_pinned: item.is_pinned || false,
    });
    setEditingId(item.id);
    setFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("news").delete().eq("id", id);
    fetchNews();
  };

  const togglePin = async (id: string, currentStatus: boolean = false) => {
    const { error } = await supabase
      .from("news")
      .update({ is_pinned: !currentStatus })
      .eq("id", id);

    if (error) {
      alert("Gagal mengubah status pin.");
    } else {
      fetchNews();
    }
  };

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-900">Berita Pesantren</h2>
        <button
          onClick={() => {
            setFormVisible(!formVisible);
            setFormData({
              id: "",
              title: "",
              content: "",
              image_url: "",
              is_pinned: false,
            });
            setEditingId(null);
            setImageFile(null);
          }}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 flex items-center gap-2"
        >
          <FaPlus /> Tambah Berita
        </button>
      </div>

      {formVisible && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <input
            type="text"
            name="title"
            placeholder="Judul Berita"
            className="w-full border p-2 mb-4 rounded"
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            name="content"
            placeholder="Isi Berita"
            className="w-full border p-2 mb-4 rounded"
            rows={5}
            value={formData.content}
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 mb-4 rounded"
            onChange={handleFileChange}
          />
          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
          >
            {editingId ? "Perbarui Berita" : "Tambah Berita"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4">Gambar</th>
              <th className="px-6 py-4">Judul</th>
              <th className="px-6 py-4">Isi</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-3">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt="thumb"
                      className="w-14 h-14 object-cover rounded border shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-200 flex items-center justify-center text-gray-400 rounded border">
                      -
                    </div>
                  )}
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    {item.title}
                    {item.is_pinned && (
                      <FaThumbtack className="text-yellow-500" title="Pinned" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700 max-w-xs">
                  <Linkify options={linkifyOptions}>
                    {item.content.length > 100
                      ? item.content.slice(0, 100) + "..."
                      : item.content}
                  </Linkify>
                </td>
                <td className="px-6 py-3 text-center">
                  <div className="flex flex-col items-center gap-2">
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
                    <button
                      onClick={() => togglePin(item.id, item.is_pinned)}
                      className="text-yellow-600 hover:text-yellow-800 text-sm flex items-center gap-1"
                    >
                      <FaThumbtack />
                      {item.is_pinned ? "Unpin" : "Pin"}
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
