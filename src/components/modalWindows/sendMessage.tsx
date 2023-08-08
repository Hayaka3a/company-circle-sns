import { supabase } from "../../createClient";

// messagesテーブルにメッセージを保存
export default async function SendMessage(postID, message, postedID, closeModal) {
    const { data, error } = await supabase
    .from("messages")
    .insert([
        {
          postID: postID,
          message: message,
          scout: false,
          isRead: false,
          isAnswered: false,
          postedBy: postedID,
          status: false,
        },
      ]);
    if (error) {
        console.error("メッセージの送信中にエラーが発生しました:");
    } else {
        console.log("データが正常に送信されました");
        closeModal();
    }
};