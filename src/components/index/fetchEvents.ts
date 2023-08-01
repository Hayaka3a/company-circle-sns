import { supabase } from "../../createClient";

export const fetchEvents = async (setEvents) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", false)
    .order("createdAt", { ascending: false })
    .limit(6);

  if (error) {
    console.error("イベント情報取得失敗", error.message);
  } else {
    // createdAtフィールドで降順にソート
    const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
    setEvents(sortedData);
  }
};
