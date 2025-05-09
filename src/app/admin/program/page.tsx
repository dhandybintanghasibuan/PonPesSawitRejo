"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaPlus,
  FaBookOpen,
  FaCheckCircle,
  FaTrash,
  FaEdit,
  FaImage,
} from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminProgramPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data: result, error } = await supabase
      .from("program")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && result) setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel("realtime:program")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "program" },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Yakin ingin menghapus program ini?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("program").delete().eq("id", id);
    if (!error) {
      fetchData();
    } else {
      alert("Gagal menghapus: " + error.message);
    }
  };

  const filtered =
    filter === "all" ? data : data.filter((item) => item.status === filter);

  const totalProgram = data.length;
  const totalAktif = data.filter((d) => d.status === "Aktif").length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Program Pendidikan</h1>
        <Link
          href="/admin/program/tambah"
          className="flex items-center gap-2 px-4 py-2 bg-[#0d4f9e] text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition"
        >
          <FaPlus /> Tambah Program
        </Link>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
          <div className="bg-[#0d4f9e] text-white p-3 rounded-full">
            <FaBookOpen />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Program</p>
            <h3 className="text-xl font-bold text-gray-800">{totalProgram}</h3>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <FaCheckCircle />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Program Aktif</p>
            <h3 className="text-xl font-bold text-gray-800">{totalAktif}</h3>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {["all", "Aktif", "Draft"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === status
                ? "bg-[#0d4f9e] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {status === "all" ? "Semua" : status}
          </button>
        ))}
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500 text-center">Memuat data...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Gambar</th>
                <th className="px-6 py-3 text-left font-medium">
                  Nama Program
                </th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.nama}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">
                        <FaImage />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {item.nama}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Aktif"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/program/edit/${item.id}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        <FaEdit className="inline mr-1" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        <FaTrash className="inline mr-1" /> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
