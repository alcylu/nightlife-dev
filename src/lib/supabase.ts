import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nqwyhdfwcaedtycojslb.supabase.co";
const supabaseAnonKey =
  "sb_publishable_2UcMKVbZxGp8_kbVitudTw_27zOyU_V";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
