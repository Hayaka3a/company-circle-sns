// 既読に変更し、メッセージ全文確認ページへ遷移

import { useNavigate } from "react-router-dom";
import { supabase } from "../../createClient";

export function useReadHandler() {
  const navigate = useNavigate();

  const handleRead = async (messageId) => {
    const { error } = await supabase
      .from("messages")
      .update({ isRead: true })
      .eq("id", messageId);
    if (error) {
      console.error("Failed to update 'isRead' field:", error);
    } else {
      navigate(`/message/${messageId}`);
    }
  };

  return handleRead;
}
