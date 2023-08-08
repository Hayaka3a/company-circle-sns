import { supabase } from "../../../createClient";

export default async function FetchData(userID, setHasNewMessage) {
  try {
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("id")
      .eq("userID", userID)
      .eq("status", false);

    if (postsError) {
      console.error("データ取得失敗", postsError.message);
      return;
    }

    const { data: messages, error: messagesError } = await supabase
      .from("messages")
      .select("*")
      .eq("postID", posts[0].id)
      .eq("isRead", false)
      .eq("status", false);

    if (messagesError) {
      console.error("メッセージ情報取得失敗", messagesError.message);
    }

    if (messages.length > 0) {
      setHasNewMessage(true);
    }
  } catch (error) {
    console.error("メッセージ情報取得失敗2", error.message);
  }
}
