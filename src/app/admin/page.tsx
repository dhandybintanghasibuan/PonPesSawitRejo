"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import {
  FaBookOpen,
  FaCheckCircle,
  FaEdit,
  FaTrash,
  FaImage,
} from "react-icons/fa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboardPage() {
  const [filter, setFilter] = useState("all");
  const [programs, setPrograms] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrograms = async () => {
    const { data, error } = await supabase
      .from("program")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setPrograms(data);
    setLoading(false);
  };

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setContacts(data);
  };

  useEffect(() => {
    fetchPrograms();
    fetchContacts();

    const channel = supabase
      .channel("realtime:program")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "program" },
        fetchPrograms
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
    if (!error) fetchPrograms();
    else alert("Gagal menghapus: " + error.message);
  };

  const filtered =
    filter === "all" ? programs : programs.filter((p) => p.status === filter);

  const totalProgram = programs.length;
  const totalAktif = programs.filter((d) => d.status === "Aktif").length;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Program</h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      <div className="flex gap-2 flex-wrap">
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

      {/* Tabel Program */}
      <div className="bg-white rounded-xl shadow-md overflow-auto">
        <table className="min-w-[1000px] w-full divide-y divide-gray-200 text-sm">
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
                <td colSpan={5} className="text-center px-6 py-4 text-gray-500">
                  Memuat data...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center px-6 py-4 text-gray-500">
                  Tidak ada program ditemukan.
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
                      <div className="w-14 h-14 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                        <FaImage />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
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
                  <td className="px-6 py-4">{item.peserta || 0}</td>
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

      {/* Kontak Masuk Terbaru */}
      <article className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Kontak Masuk Terbaru
        </h2>
        {contacts.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada pesan masuk.</p>
        ) : (
          <ul className="divide-y divide-gray-200 text-sm">
            {contacts.slice(0, 5).map((item) => (
              <li key={item.id} className="py-3">
                <p className="font-semibold text-[#0d4f9e]">{item.nama}</p>
                <p className="text-gray-600">{item.email}</p>
                <p className="text-gray-700 mt-1 line-clamp-2">{item.pesan}</p>
              </li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
}
