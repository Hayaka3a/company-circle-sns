import { supabase } from "../createClient";

// fetchIslandData関数の定義
export default async function FetchIslandData(paramsID, setIslandName, setIsland, setIsButtonsVisible){
    // messages テーブルから該当のデータを取得
    const { data: message, error: messagesError } = await supabase
      .from("messages")
      .select("*")
      .eq("id", paramsID)
      .single();

    if (messagesError) {
      console.error("メッセージの取得エラー", messagesError);
      return;
    }

    // posts テーブルから該当のデータを取得
    const { data: post, error: postsError } = await supabase
      .from("posts")
      .select("*")
      .eq("id", message.postedBy)
      .single();

    if (postsError) {
      console.error("ポストの取得エラー", postsError);
      return;
    }

    // islands テーブルから該当のデータを取得
    const { data: island, error: islandsError } = await supabase
      .from("islands")
      .select("islandName, id")
      .eq("id", post.islandID)
      .single();

    if (islandsError) {
      console.error("イベント情報の取得エラー", islandsError);
      return;
    }

    // 島名を設定
    setIslandName(island.islandName);
    setIsland(island);

    // ボタンの表示状態を設定
    setIsButtonsVisible(!message.isAnswered);
};

