"use client";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = "sb-access-token=; Max-Age=0; path=/";
    router.push("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
    >
      <FaSignOutAlt />
      Logout
    </button>
  );
}
