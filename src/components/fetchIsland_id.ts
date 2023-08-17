import { supabase } from "../createClient";

export default async function FetchIsland(eventId) {
  const { data, error } = await supabase
    .from("userEntryStatus")
    .select("*,islands(*)")
    .eq("eventID", eventId.id) // 島のIDに応じてフィルタリングする（eventId.idは該当する島のID）
    .eq("status", false);
  if (error) {
    console.error("fetchIsland:", error);
    return;
  }
  if (data.length === 0) {
    console.warn("該当する島の詳細情報が見つかりませんでした");
    return;
  } else {
    const island = data.filter((data) => data.islandID);
    return island;
  }
}
