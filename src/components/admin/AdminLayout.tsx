"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaBook,
  FaImages,
  FaInbox,
  FaChalkboardTeacher,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import "@/app/globals.css";

// Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const menus = [
  { title: "Dashboard", href: "/admin", icon: <FaHome /> },
  { title: "Program", href: "/admin/program", icon: <FaBook /> },
  { title: "Galeri", href: "/admin/gallery", icon: <FaImages /> },
  { title: "Kontak", href: "/admin/kontak", icon: <FaInbox /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-[#f7f9fc] text-gray-800">
      {/* Sidebar */}
      <aside className="w-24 bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between py-6 items-center">
        {/* TOP: Logo + Menu */}
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Image
            src="/assets/img/logopesantren.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full border"
          />

          {/* Menu List */}
          <nav className="flex flex-col gap-4 w-full items-center">
            {menus.map((menu, i) => {
              const active = pathname === menu.href;
              return (
                <Link
                  key={i}
                  href={menu.href}
                  className={`w-[90%] py-3 px-2 flex flex-col items-center rounded-xl transition-all ${
                    active
                      ? "bg-[#0d4f9e] text-white shadow-md"
                      : "text-gray-500 hover:bg-gray-100 hover:text-[#0d4f9e]"
                  }`}
                >
                  <div className="text-xl mb-1">{menu.icon}</div>
                  <div className="text-[11px] font-semibold text-center leading-tight">
                    {menu.title}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM: Logout */}
        <div className="w-full flex justify-center mt-6">
          <button
            onClick={handleLogout}
            className="w-[90%] py-3 flex flex-col items-center rounded-xl text-gray-500 hover:text-red-600 hover:bg-gray-100 transition-all"
          >
            <FaSignOutAlt className="text-xl mb-1" />
            <span className="text-[11px] font-semibold text-center leading-tight">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-10 py-6">{children}</main>
    </div>
  );
}
