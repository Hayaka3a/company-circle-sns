import { supabase } from "../createClient";

export default async function FetchEvent(fetchEventID, setEventID, setEventName, setStartDate, setEndDate, setEventDetail, setImageUrl) {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("id", fetchEventID);

    if (data) {
      const event = data[0];
      const fetcheventID = event.id;

      setEventID(fetcheventID); // eventIDステートに値をセット
      setEventName(event.eventName); // イベント名をeventNameステートにセット
      setStartDate(event.startDate); // イベント開始日時（startDate）をstartDateステートにセット
      setEndDate(event.endDate); // イベント終了日時（endDate）をendDateステートにセット
      setEventDetail(event.detail); // イベント詳細をeventDetailステートにセット
      setImageUrl(event.thumbnail); // サムネイルをthumbnailステートにセット
    }
};