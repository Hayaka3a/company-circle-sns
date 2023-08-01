// スレッド作成時に表示する島名orイベント名のデータ取得

import { supabase } from "../../../createClient";

export default async function ThreadFetch(islandID, eventID) {
  // 島のスレッド作成時
  if (islandID) {
    const { data } = await supabase
      .from("islands")
      .select("islandName")
      .eq("id", islandID)
      .eq("status", false)
      .single();
    if (data) {
      return data.islandName;
    }
    // イベントのスレッド作成時
  } else if (eventID) {
    const { data } = await supabase
      .from("events")
      .select("eventName")
      .eq("id", eventID)
      .eq("status", false)
      .single();
    if (data) {
      return data.eventName;
    }
  }

  return null;
}
