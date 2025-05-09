"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

interface Contact {
  id: string;
  nama: string;
  email: string;
  pesan: string;
  created_at: string;
}

export default function AdminKontakPage() {
  const [kontak, setKontak] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKontak = async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        alert("Gagal mengambil data kontak.");
      }

      if (data) {
        setKontak(data);
      }

      setLoading(false);
    };

    fetchKontak();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-[#0d4f9e] mb-6">Kontak Masuk</h1>

      {loading ? (
        <p className="text-gray-600">Memuat pesan...</p>
      ) : kontak.length === 0 ? (
        <p className="text-gray-600">Belum ada pesan masuk.</p>
      ) : (
        <div className="space-y-5">
          {kontak.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-lg shadow border border-gray-200"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-1">
                <h3 className="font-semibold text-lg text-[#0d4f9e]">
                  {item.nama}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Email:</strong> {item.email}
              </p>
              <p className="text-gray-800 whitespace-pre-line">{item.pesan}</p>
              <a
                href={`mailto:${item.email}`}
                className="inline-block mt-4 text-sm text-white bg-[#0d4f9e] px-4 py-2 rounded hover:bg-blue-900 transition"
              >
                Balas Email
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
