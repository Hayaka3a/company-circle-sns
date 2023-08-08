import { supabase } from "../createClient";

export default async function FetchUserMessages(id, setUserMessages, fetchPosts) {
    const { data: messages, error: messagesError } = await supabase
      .from("messages")
      .select("*")
      .eq("id", parseInt(id))
      .eq("status", false);

    if (messagesError) {
      console.log("messagesの取得エラー", messagesError);
      return;
    }

    if (messages) {
      setUserMessages(messages);

      const messagesPosteBy = messages.map((message) => message.postedBy);
      fetchPosts(messagesPosteBy);
    }
};