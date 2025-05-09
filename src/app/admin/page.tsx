"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  FaUsers,
  FaBookOpen,
  FaCheckCircle,
  FaEdit,
  FaTrash,
  FaImage,
} from "react-icons/fa";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
  const [filter, setFilter] = useState("all");
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("program")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPrograms(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("realtime:program")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "program",
        },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus program ini?")) {
      const { error } = await supabase.from("program").delete().eq("id", id);
      if (!error) fetchData();
      else alert("Gagal menghapus: " + error.message);
    }
  };

  const filtered =
    filter === "all" ? programs : programs.filter((p) => p.status === filter);

  const totalProgram = programs.length;
  const totalPeserta = programs.reduce((sum, p) => sum + p.peserta, 0);
  const totalAktif = programs.filter((p) => p.status === "Aktif").length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Program
      </h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
          <div className="bg-green-600 text-white p-3 rounded-full">
            <FaUsers />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Peserta</p>
            <h3 className="text-xl font-bold text-gray-800">{totalPeserta}</h3>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
          <div className="bg-yellow-500 text-white p-3 rounded-full">
            <FaCheckCircle />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Program Aktif</p>
            <h3 className="text-xl font-bold text-gray-800">{totalAktif}</h3>
          </div>
        </div>
      </div>

      {/* Grafik */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Peserta per Program
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={programs}>
            <XAxis dataKey="nama" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="peserta" fill="#0d4f9e" />
          </BarChart>
        </ResponsiveContainer>
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
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Gambar</th>
              <th className="px-6 py-3 text-left font-medium">Nama Program</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
              <th className="px-6 py-3 text-left font-medium">Peserta</th>
              <th className="px-6 py-3 text-right font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Memuat data...
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {item.gambar_url ? (
                      <img
                        src={item.gambar_url}
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
                  <td className="px-6 py-4">{item.peserta}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
