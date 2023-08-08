// 島のデータを取得する関数
import { supabase } from "../../createClient";

export default function FetchIslandsData(islands, setIslands) {
  const fetchIslandsData = async () => {
    const { data, error } = await supabase
      .from("islands")
      .select("*")
      .eq("status", false);

    if (error) {
      console.error("islandsテーブルデータ情報取得失敗", error);
      return;
    }

    setIslands(data);
  };

  fetchIslandsData();

  return islands;
}
