import { supabase } from "../createClient";
import { Event, Island } from "../types/members";

//該当する島かイベントの情報を取得する関数
export async function fetchAllIsEve({
  table,
  paramsID,
  setEventData,
  setIslandData,
}: {
  table: string;
  paramsID: number;
  setEventData?: React.Dispatch<React.SetStateAction<Event>>;
  setIslandData?: React.Dispatch<React.SetStateAction<Island>>;
}) {
  //島かイベントかをtablePropsで判断してデータ取得
  const { data, error } = await supabase
    .from(`${table}s`)
    .select("*")
    .eq(`id`, paramsID)
    .eq(`status`, false);

  // データ取得時のエラー処理
  if (!data) return;
  if (error) {
    console.log(error);
  } else {
    //イベントを取得した場合の処理
    if (setEventData) {
      const eve = data[0] as Event;
      setEventData(eve);
    } else {
      //島を取得した場合の処理
      const is = data[0] as Island;
      setIslandData(is);
    }
  }
}
