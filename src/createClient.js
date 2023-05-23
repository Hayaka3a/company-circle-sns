import { createClient } from "@supabase/supabase-js";

// Project URL, API KEYの設定
export const supabase = createClient(
  "https://tfydnlbfauusrsxxhaps.supabase.co", // Project URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmeWRubGJmYXV1c3JzeHhoYXBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4MTEzODIsImV4cCI6MjAwMDM4NzM4Mn0.5zF-ou0o0sJ4Nr-WVmfuEHcehs1Bwmwn0y7CNSASzQY",
);
