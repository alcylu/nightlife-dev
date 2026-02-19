import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nqwyhdfwcaedtycojslb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xd3loZGZ3Y2FlZHR5Y29qc2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwOTg0MTgsImV4cCI6MjA0NDY3NDQxOH0.dG3KvP4cOrdsJFHU9jM35SjGsCbkxIbxyITlkd4IHLE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
