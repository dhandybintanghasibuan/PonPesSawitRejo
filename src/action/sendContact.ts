"use server";
import { supabase } from "@/lib/supabase";

export async function sendContact({
  nama,
  email,
  pesan,
}: {
  nama: string;
  email: string;
  pesan: string;
}) {
  const { error } = await supabase
    .from("contacts")
    .insert([{ nama, email, pesan }]);

  if (error) {
    console.error("❌ Gagal kirim:", error.message); // log pesan error
    return { success: false, error: error.message };
  }

  return { success: true };
}
