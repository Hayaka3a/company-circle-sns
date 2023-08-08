import { supabase } from "../../createClient";

// 現在の島・イベントの名前を取得
export default async function FetchIslandName(supabase, paramsID, setIslandName) {
    const { data: island, error: islandError } = await supabase
      .from("islands")
      .select("islandName")
      .eq("id", paramsID)
      .eq("status", false);

    if (islandError) {
      console.log(islandError, "エラーが発生しました");
    } else if (island && island.length > 0) {
      setIslandName(island[0].islandName + "島");
    } else {
      const { data: event, error: eventError } = await supabase
        .from("events")
        .select("eventName")
        .eq("id", paramsID)
        .eq("status", false);

      if (eventError) {
        console.log(eventError, "エラーが発生しました");
      } else if (event && event.length > 0) {
        setIslandName(event[0].eventName);
      }
    }
};