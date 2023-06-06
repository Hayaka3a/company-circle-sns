import { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import GetCookieID from "../cookie/getCookieId";

export default function BelongIsland() {
  const userID = GetCookieID();
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: entrys, error: entrysError } = await supabase
          .from("userEntryStatus")
          .select("islandID")
          .eq("userID", userID);

        if (entrysError) {
          console.error("データ1取得失敗", entrysError.message);
          return;
        }

        for (const entry of entrys) {
          const { data: posts, error: postsError } = await supabase
            .from("posts")
            .select("id")
            .eq("islandID", entry.islandID);

          if (postsError) {
            console.error("データ2取得失敗", postsError.message);
            return;
          }

          for (const post of posts) {
            const { data: messages, error: messagesError } = await supabase
              .from("messages")
              .select("*")
              .eq("postID", post.id)
              .eq("isRead", "false");

            if (messagesError) {
              console.error("データ3取得失敗", messagesError.message);
              return;
            }
            if (messages.length > 0) {
              setHasNewMessage(true);
              return; // 最初の未読メッセージが見つかったらループを中断する
            }
          }
        }
        // 最初の未読メッセージが見つからなかった場合は false を設定する
        setHasNewMessage(false);
      } catch (error) {
        console.error("メッセージ情報取得失敗", error.message);
      }
    };

    fetchData();
  }, [userID]);

  return (
    <>{hasNewMessage && <p>✴島ポストに新しいメッセージが届いています</p>}</>
  );
}
