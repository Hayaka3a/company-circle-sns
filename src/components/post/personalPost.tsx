import { Dispatch, SetStateAction, useEffect } from "react";
import { supabase } from "../../createClient";
import GetCookieID from "../cookie/getCookieId";
import styles from "../../styles/index.module.css";

export default function PersonalPost({
  hasNewMessage,
  setHasNewMessage,
}: {
  hasNewMessage: boolean;
  setHasNewMessage: Dispatch<SetStateAction<boolean>>;
}) {
  const userID = GetCookieID();

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, [userID, setHasNewMessage]);

  return (
    <>
      {hasNewMessage && (
        <div className={styles.flex}>
          <img
            src={"/images/light.png"}
            alt="event"
            className={styles.party}
          ></img>
          <p className={styles.p}>
            あなたのポストに新しいメッセージが届いています
          </p>
        </div>
      )}
    </>
  );
}
