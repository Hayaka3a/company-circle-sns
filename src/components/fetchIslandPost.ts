import { supabase } from "../createClient";

// すでに住民申請を送っているか確認確認
export default async function FetchIslandPost(userId, islandId, setAlreadyError) {
    // ユーザーのポスト番号取得
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("userID", userId)
      .eq("status", false);

    if (error) {
      console.log("ユーザーポスト番号取得失敗");
    }
    if (!data) {
      console.log("データがありません");
    } else {
      const { data: message, error: messageError } = await supabase
        .from("messages")
        .select("*")
        .eq("postedBy", data[0].id)
        .eq("status", false);

      if (!message) {
        console.log("データがありません。");
      } else {
        const appMsg = message.filter((msg) => msg.message === "参加申請");

        // 島ポスト番号取得
        if (appMsg.length > 0) {
          const { data: island, error: islandError } = await supabase
            .from("posts")
            .select("*")
            .eq("islandID", Number(islandId.id))
            .eq("status", false);

          if (islandError) {
            console.log("島ポスト番号取得失敗");
          }
          if (!island) {
            console.log("取得できませんでした");
          } else {
            // 島ポスト番号が送信済みの参加申請のpostIDと同じだった場合に「住民申請」ボタンをグレーアウトし、「すでに申請済みです」のエラーを表示させる
            const matchingAppMsg = appMsg.find(
              (msg) => msg.postID === island[0].id,
            );
            if (matchingAppMsg) {
              setAlreadyError("すでに住民許可申請を送っています");
            }
          }
          if (messageError) {
            console.log("ユーザー送信メッセージ一覧取得失敗");
          }
        }
      }
    }
};