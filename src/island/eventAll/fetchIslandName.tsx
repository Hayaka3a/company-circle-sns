// 島の名前を取得する関数
import { supabase } from "../../createClient";

export default function FetchIslandName(islandName, setIslandName, paramsID) {
  const fetchIslandName = async () => {
    const { data, error } = await supabase
      .from("islands")
      .select("islandName")
      .eq("id", paramsID)
      .eq("status", false);

    if (error) {
      console.error("islandsテーブルデータ情報取得失敗", error);
      return;
    }

    if (data && data.length > 0) {
      setIslandName(data[0].islandName);
    }
  };

  fetchIslandName();

  return islandName;
}
