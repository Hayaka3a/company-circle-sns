import { supabase } from "../../createClient";

export default async function SaveMessage(postID, postedID, message, closeModal) {
    const { error } = await supabase.from("messages").insert([
      {
        postID: postID,
        message: "参加申請",
        scout: false,
        isRead: false,
        isAnswered: false,
        postedBy: postedID,
        status: false,
      },
    ]);
    if (error) {
      console.log(error, "メッセージ追加エラー");
    } else {
      const { data: messageID, error: messageIDError } = await supabase
        .from("messages")
        .select("id")
        .eq("postID", postID)
        .eq("postedBy", postedID)
        .eq("status", false);
      if (messageIDError) {
        console.log(messageIDError, "メッセージID取得エラー");
      } else {
        const { error } = await supabase.from("applications").insert([
          {
            messageID: messageID[0].id,
            message: message,
            status: false,
          },
        ]);
        if (error) {
          console.log(error, "アプリケーションズ追加エラー");
        } else {
          closeModal();
        }
      }
    }
};