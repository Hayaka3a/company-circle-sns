import { supabase } from "../../../createClient";

export default async function FetchData(userID, setHasNewMessage) {
  try {
    const { data: entrys, error: entrysError } = await supabase
      .from("userEntryStatus")
      .select("islandID")
      .eq("userID", userID)
      .eq("status", false);

    if (entrysError) {
      console.error("データ1取得失敗", entrysError.message);
      return;
    }

    // データがnullまたは空の場合は何も行わずにreturnする
    if (!entrys || entrys.length === 0) {
      return;
    }

    for (const entry of entrys) {
      // islandIDがnullじゃない場合は実行
      if (entry.islandID !== null) {
        const { data: posts, error: postsError } = await supabase
          .from("posts")
          .select("id")
          .eq("islandID", entry.islandID)
          .eq("status", false);

        if (postsError) {
          console.error("データ2取得失敗", postsError.message);
          return;
        }

        posts.map(async (post) => {
          const { data: messages, error: messagesError } = await supabase
            .from("messages")
            .select("*")
            .eq("postID", post.id)
            .eq("isRead", "false")
            .eq("status", false);

          // データがnullまたは空の場合は何も行わずにreturnする
          if (!messages || messages.length === 0) {
            return;
          }

          if (messagesError) {
            console.error("データ3取得失敗", messagesError.message);
          }
          if (messages.length > 0) {
            setHasNewMessage(true);
            console.log("メッセージを見つけました");
          }
        });
      } else {
        // islandIDがnullの場合はスキップ
        return;
      }
    }
    // 最初の未読メッセージが見つからなかった場合は false を設定する
    setHasNewMessage(false);
  } catch (error) {
    console.error("メッセージ情報取得失敗", error.message);
  }
}
