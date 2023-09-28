import { createClient } from "@supabase/supabase-js";

// Project URL, API KEYの設定
export const supabase = createClient(process.env.DATABASE, process.env.PW);
