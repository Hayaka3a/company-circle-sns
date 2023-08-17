import { supabase } from "../../createClient";

// イベント名を取得してモーダルウィンドウに表示
export default async function FetchEventName(supabase, paramsID, setEventName) {
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("eventName")
    .eq("id", paramsID);

  if (eventError) {
    console.log(eventError, "エラーが発生しました");
  } else if (event && event.length > 0) {
    setEventName(event[0].eventName);
  }
}
