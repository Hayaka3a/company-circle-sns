import { supabase } from "../../createClient";

// 既読に変更し、メッセージ全文確認ページへ遷移
export const readHandler = async (message, navigate) => {
  const { error } = await supabase
    .from("messages")
    .update({ isRead: true })
    .eq("id", message);
  if (error) {
    console.error("Failed to update 'isRead' field:", error);
  } else {
    navigate(`/message/${message}`);
  }
};
