import { supabase } from "../createClient";

export default async function FetchEventPosts(userId, eventId, setAlreadyError) {
  // ユーザーのポスト番号取得
  const { data, error } = await supabase
    .from("posts")
    .select("id")
    .eq("userID", userId)
    .eq("status", false);

  if (error) {
    console.log("ユーザーポスト番号取得失敗");
  }

  // ユーザーが送信したメッセージ取得
  const { data: message, error: messageError } = await supabase
    .from("messages")
    .select("*")
    .eq("postedBy", data[0].id)
    .eq("status", false);

  const appMsg = message.filter((msg) => msg.message === "参加申請");

  // イベントポスト番号取得
  if (appMsg.length > 0) {
    const { data: event, error: eventError } = await supabase
      .from("posts")
      .select("*")
      .eq("eventID", Number(eventId.id))
      .eq("status", false);

    if (eventError) {
      console.log("島ポスト番号取得失敗");
    }

    // イベントポスト番号が送信済みの参加申請のpostIDと同じだった場合に「住民申請」ボタンをグレーアウトし、「すでに申請済みです」のエラーを表示させる
    const matchingAppMsg = appMsg.find((msg) => msg.postID === event[0].id);
    if (matchingAppMsg) {
      setAlreadyError("すでに住民許可申請を送っています");
    }
  }
  if (messageError) {
    console.log("ユーザー送信メッセージ一覧取得失敗");
  }
};
