import { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import GetCookieID from "../cookie/getCookieId";
import styles from "../../styles/index.module.css";

export default function BelongIsland() {
  const userID = GetCookieID();
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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

            console.log(posts);

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

              console.log(messages);

              // データがnullまたは空の場合は何も行わずにreturnする
              if (!messages || messages.length === 0) {
                // console.log("データがnullもしくは空です");
                return;
              }

              if (messagesError) {
                console.error("データ3取得失敗", messagesError.message);
              }
              if (messages.length > 0) {
                setHasNewMessage(true);
                console.log("メッセージを見つけました");
                // 最初の未読メッセージが見つかったらループを中断する
              }
            });
          } else {
            // islandIDがnullの場合はスキップ
            console.log("どこの島にも所属していません");
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
    <>
      {hasNewMessage && (
        <p className={styles.p}>✴島ポストに新しいメッセージが届いています</p>
      )}
    </>
  );
}
