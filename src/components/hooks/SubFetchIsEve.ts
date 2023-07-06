import { supabase } from "../../createClient";
import { Island, Event } from "../../types/members";

export default function SubFetchIsEve({
  userID,
  setCombi,
}: {
  userID: number;
  setCombi: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const fetch = async () => {
    // 参加している島と、難民として参加しているイベントを取得
    let { data, error } = await supabase
      .from("userEntryStatus")
      .select("islands(*), events(*)")
      .eq("userID", userID)
      .eq("status", false);
    if (error) {
      console.log(error, "firstFetchError");
    }
    if (!data) {
      return;
    } else {
      const tmpIs: { islands: Island; events: Event | null }[] = data.map(
        (item: any) => ({
          islands: item.islands as Island,
          events: item.events as Event | null,
        }),
      );
      // 島が参加しているイベント取得
      const joinIsArray = tmpIs
        .filter((data) => data.islands)
        .map((data) => data.islands.id);

      let { data: eveData, error: eveError } = await supabase
        .from("userEntryStatus")
        .select("events(*)")
        .in("islandID", joinIsArray)
        .eq("status", false);

      if (eveError) {
        console.log(eveError, "eveError");
      } else if (eveData.length > 0) {
        // 取得した２つのデータを１つの配列にする
        const tmpEve: { events: Event | null; islands: Island | null }[] =
          eveData.map((item: any) => ({
            events: item.events as Event | null,
            islands: null,
          }));

        tmpEve.map((data) => tmpIs.push(data));

        setCombi(tmpIs);
      } else {
        return;
      }
    }
  };
  fetch();
}
