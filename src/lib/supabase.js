import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Aviso: Variáveis de ambiente do Supabase ausentes no .env.local. Certifique-se de preenchê-las."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
