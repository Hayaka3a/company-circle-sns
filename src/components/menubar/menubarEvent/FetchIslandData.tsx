// 表示しているイベントの情報をeventに挿入

import { supabase } from "../../../createClient";

export interface Event {
  eventName: string;
  thumbnail: string;
}

export default async function FetchIslandData(paramsID: number) {
  const { data, error } = await supabase
    .from("events")
    .select("eventName, thumbnail")
    .eq("id", paramsID)
    .eq("status", false);

  if (error) {
    console.error("eventsテーブルデータ情報取得失敗", error);
    return null;
  }

  if (data && data.length > 0) {
    const eventData: Event = {
      eventName: data[0].eventName,
      thumbnail:
        data[0].thumbnail ||
        "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-05T07%3A40%3A07.886Z",
    };
    return eventData;
  }

  return null;
}
