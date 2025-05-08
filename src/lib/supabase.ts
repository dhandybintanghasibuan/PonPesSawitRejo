// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Gunakan environment variable dari .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Inisialisasi Supabase Client
export const supabase = createClient(supabaseUrl, supabaseKey);
