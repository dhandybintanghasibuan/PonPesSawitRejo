"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaBook,
  FaImages,
  FaInbox,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaNewspaper,
  FaTools,
  FaFutbol,
  FaFlagCheckered,
  FaEllipsisV,
} from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "@/app/globals.css";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const menus = [
  { title: "Beranda", href: "/admin", icon: <FaHome /> },
  { title: "Berita", href: "/admin/berita", icon: <FaNewspaper /> },
  { title: "Program", href: "/admin/program", icon: <FaBook /> },
  { title: "Fasilitas", href: "/admin/fasilitas", icon: <FaTools /> },
  { title: "Galeri", href: "/admin/galeri", icon: <FaImages /> },
  { title: "Prestasi", href: "/admin/prestasi", icon: <FaChalkboardTeacher /> },
  { title: "Kontak", href: "/admin/kontak", icon: <FaInbox /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [openLainnya, setOpenLainnya] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f9fc] text-gray-800">
      {!isLoginPage && (
        <aside className="w-20 h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between items-center fixed py-4 z-40">
          {/* Logo */}
          <div className="flex flex-col items-center gap-6">
            <Image
              src="/assets/img/logopesantren.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full border"
            />

            {/* Menu Utama */}
            <nav className="flex flex-col gap-4 w-full items-center">
              {menus.map((menu, i) => {
                const active = pathname === menu.href;
                return (
                  <Link
                    key={i}
                    href={menu.href}
                    className={`w-[90%] py-2 px-1 flex flex-col items-center rounded-lg transition-all ${
                      active
                        ? "bg-[#0d4f9e] text-white shadow"
                        : "text-gray-500 hover:bg-gray-100 hover:text-[#0d4f9e]"
                    }`}
                  >
                    <div className="text-base">{menu.icon}</div>
                    <div className="text-[10px] font-semibold text-center leading-tight">
                      {menu.title}
                    </div>
                  </Link>
                );
              })}

              {/* Lainnya */}
              <div className="relative w-full flex justify-center">
                <button
                  onClick={() => setOpenLainnya(!openLainnya)}
                  className={`w-[90%] py-2 px-1 flex flex-col items-center rounded-lg transition-all ${
                    pathname.includes("/admin/ekstrakurikuler") ||
                    pathname.includes("/admin/classmeet") ||
                    pathname.includes("/admin/outingclass")
                      ? "bg-[#0d4f9e] text-white shadow"
                      : "text-gray-500 hover:bg-gray-100 hover:text-[#0d4f9e]"
                  }`}
                >
                  <FaEllipsisV className="text-base" />
                  <span className="text-[10px] font-semibold text-center leading-tight">
                    Lainnya
                  </span>
                </button>

                {/* Dropdown ke kanan */}
                {openLainnya && (
                  <div className="absolute left-full top-0 ml-2 bg-white border shadow-lg rounded-md w-36 z-50 py-2">
                    <Link
                      href="/admin/ekstrakurikuler"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaFutbol className="mr-2" /> Ekskul
                    </Link>
                    <Link
                      href="/admin/classmeet"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaFlagCheckered className="mr-2" /> Class Meet
                    </Link>
                    <Link
                      href="/admin/outingclass"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaImages className="mr-2" /> Outing Class
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Logout */}
          <div className="w-full px-2 pb-4">
            <button
              onClick={handleLogout}
              className="w-full py-2 flex flex-col items-center text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-md transition-all"
            >
              <FaSignOutAlt className="text-base mb-1" />
              <span className="text-[10px] font-semibold text-center leading-tight">
                Logout
              </span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main
        className={`${
          !isLoginPage ? "ml-20" : ""
        } flex-1 px-4 md:px-10 py-6 overflow-y-auto h-screen`}
      >
        {children}
      </main>
    </div>
  );
}
  