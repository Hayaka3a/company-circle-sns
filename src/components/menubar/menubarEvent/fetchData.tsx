// ユーザーが表示しているイベントに参加しているかどうかチェック
import { supabase } from "../../../createClient";

export default async function FetchData(userID: string, paramsID: number) {
  try {
    // ユーザーが参加している島からイベントを取得
    const { data: entrys, error: entrysError } = await supabase
      .from("userEntryStatus")
      .select("islandID")
      .eq("userID", userID)
      .eq("status", false);

    // entrys配列の中からeventIDがnullの値のものを配列から取り除く
    const ens = entrys.filter((event) => event.islandID !== null);

    if (entrysError) {
      console.error("データ1取得失敗", entrysError.message);
      return { uniqueEvents: [], isJoined: false };
    }

    try {
      const filteredEvents = await Promise.all(
        ens.map(async (en) => {
          const { data: events, error: eventsError } = await supabase
            .from("userEntryStatus")
            .select("eventID")
            .eq("islandID", en.islandID)
            .eq("status", false);

          if (eventsError) {
            console.error("データ1取得失敗", eventsError.message);
            return [];
          }

          // events配列の中からeventIDがnullの値のものを配列から取り除く
          const filteredEvents = events.filter(
            (event) => event.eventID !== null,
          );

          return filteredEvents;
        }),
      );

      // 配列の配列になっているのをフラット化する（ただの配列に直す）
      const flattenedEvents = filteredEvents.flat();

      // 同じeventIDを持つデータを1つにまとめる
      const uniqueEvents = flattenedEvents.reduce((acc, event) => {
        if (!acc.some((e) => e.eventID === event.eventID)) {
          acc.push(event);
        }
        return acc;
      }, []);

      // イベントを開催している島に不参加の場合のデータを追加
      const { data: refugee, error: refugeeError } = await supabase
        .from("userEntryStatus")
        .select("eventID")
        .eq("userID", userID)
        .eq("status", false);

      if (refugeeError) {
        console.error("データ取得失敗", refugeeError.message);
        return { uniqueEvents, isJoined: false };
      }
      const uniqueEventsFiltered = refugee.filter(
        (evt) => evt.eventID !== null,
      );

      uniqueEvents.push(...uniqueEventsFiltered);
      // ユーザーもしくは参加している島がイベント参加している場合
      // uniqueEvents配列内のeventIDとparamsIDを比較して、一致する場合にisJoinedを設定
      const isJoinedEvent = uniqueEvents.some(
        (event) => event.eventID === paramsID,
      );
      return { uniqueEvents, isJoined: isJoinedEvent };
    } catch (error) {
      console.error("データ取得2失敗");
      return { uniqueEvents: [], isJoined: false };
    }
  } catch (error) {
    console.error("データ取得1失敗");
    return { uniqueEvents: [], isJoined: false };
  }
}
