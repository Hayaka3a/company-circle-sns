// イベントのデータを取得する関数
import { supabase } from "../../createClient";

export default function FetchEventsData(events, setEvents) {
  const fetchEventsData = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", false);

    if (error) {
      console.error("eventsテーブルデータ情報取得失敗", error);
      return;
    }

    setEvents(data);
  };
  fetchEventsData();

  return events;
}
