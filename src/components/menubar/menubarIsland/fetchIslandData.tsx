// 表示している島の情報をislandに挿入

import { supabase } from "../../../createClient";

export default async function FetchIslandData(paramsID) {
  try {
    const { data, error } = await supabase
      .from("islands")
      .select("islandName, thumbnail")
      .eq("id", paramsID)
      .eq("status", false);

    if (error) {
      console.error("islandsテーブルデータ情報取得失敗", error);
      return null;
    }

    if (data && data.length > 0) {
      return data[0];
    }

    return null;
  } catch (error) {
    console.error("Error fetching island data:", error);
    return null;
  }
}
