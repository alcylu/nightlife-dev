import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nqwyhdfwcaedtycojslb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xd3loZGZ3Y2FlZHR5Y29qc2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NzM4MTAsImV4cCI6MjA2MzQ0OTgxMH0.JA555L_UTKNRpdMpyovg2KAcd4zWcZGE9GFrTBe-SPA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
