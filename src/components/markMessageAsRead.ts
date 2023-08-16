import { supabase } from "../createClient";

export default async function markMessageAsRead(id) {
    const { error } = await supabase
        .from("messages")
        .update({ isRead: true })
        .eq("id", parseInt(id));

      if (error) {
        console.log("メッセージを既読にする際のエラー", error);
      } 
};
