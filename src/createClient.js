import { createClient } from "@supabase/supabase-js";

// Project URL, API KEYの設定
export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API,
);
