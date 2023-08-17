// 島のイベントを取得

import { supabase } from "../../createClient";

export default function FetchEventDataIsland({ paramsID, setEvents, events }) {
  const fetchEventData = async () => {
    const { data: userEntryStatusData, error } = await supabase
      .from("userEntryStatus")
      .select("*")
      .eq("islandID", paramsID)
      .eq("status", false);

    if (error) {
      console.error("userEntryStatusテーブル情報取得失敗");
      return;
    }

    const eventIds = userEntryStatusData
      .filter((entry) => entry.eventID !== null)
      .map((entry) => entry.eventID);

    const fetchEventDetails = async (eventId) => {
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .eq("status", false);

      if (eventError) {
        console.error("Eventsテーブルデータ情報取得失敗", eventError);
      }

      if (eventData && eventData.length > 0) {
        return eventData[0];
      } else {
        return null;
      }
    };

    const eventPromises = eventIds.map(async (eventId) => {
      return await fetchEventDetails(eventId);
    });

    const fetchedEvents = await Promise.all(eventPromises);

    // イベントデータがあるもののみ、setEvents で設定
    setEvents(fetchedEvents.filter((event) => event !== null));
  };
  fetchEventData();
  return events;
}
