import { supabase } from "../createClient";

export default async function FetchIslandDetail(islandId, userId, setButton, setIslandDetail, setIslandImage) {
    const { data, error } = await supabase
      .from("islands")
      .select("*")
      .eq("id", islandId.id) // 島のIDに応じてフィルタリングする（islandId.idは該当する島のID）
      .eq("status", false);

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", data[0].ownerID);

    const owner = user[0].id.toString();

    // ownerじゃない人には「編集・削除」ボタン機能を表示させない
    if (owner !== userId) {
      setButton(false);
    }
    if (userError) {
      console.error("owner情報の取得に失敗しました:", error);
    }

    if (error) {
      console.error("島の詳細情報の取得に失敗しました:", error);
      return;
    }
    if (data.length === 0) {
      console.warn("該当する島の詳細情報が見つかりませんでした。");
      return;
    }

    const islandDetail = data[0]; // 最初のデータを取得（仮定）
    setIslandDetail(islandDetail); // 島の詳細情報を状態変数にセット
    if (islandDetail.thumbnail) {
      setIslandImage(islandDetail.thumbnail);
    }
};