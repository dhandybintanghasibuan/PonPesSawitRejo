"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email atau password salah!");
    } else {
      router.push("/admin");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f2fe] to-[#f0fdf4] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 animate-fade-in">
        {/* Logo + Heading */}
        <div className="text-center mb-6">
          <Image
            src="/assets/img/logopesantren.png"
            alt="Logo Pesantren"
            width={70}
            height={70}
            className="mx-auto rounded-full mb-3 border border-gray-200"
          />
          <h1 className="text-2xl font-bold text-[#0d4f9e] tracking-tight">
            Login Admin
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Masukkan email dan password Anda untuk masuk.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Alamat Email"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d4f9e] transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Kata Sandi"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d4f9e] transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#0d4f9e] hover:bg-blue-900 text-white font-semibold py-2 rounded-md transition shadow"
          >
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
}
