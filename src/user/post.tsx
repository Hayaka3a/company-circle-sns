import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/island/island_post.module.css";
import { supabase } from "../createClient";
import GetCookieID from "../components/cookie/getCookieId";
import { format } from "date-fns";
import classNames from "classnames";
import LogSt from "../components/cookie/logSt";

export default function UserPost() {
  LogSt();
  const [messages, setMessages] = useState([]);

  const userID = GetCookieID();
  const navigate = useNavigate();

  //メッセージ受信
  const fetchMsg = async () => {
    // ログインユーザーのポスト番号取得
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("status", "false")
      .eq("userID", userID);

    if (error) {
      console.error("post情報取得失敗");
    } else {
      const postID = data[0].id;

      // ユーザーのポストに入っているメッセ情報取得
      const { data: msgs, error: msgError } = await supabase
        .from("messages")
        .select("*")
        .eq("postID", postID)
        .eq("status", false);

      if (msgError) {
        console.error("msg情報取得失敗");
      } else {
        if (msgs.length > 0) {
          // 受信しているメッセージがあるときのみ実行
          //msgsのオブジェクトデータごとにpostedByの検索をかける
          const promises = msgs.map(async (msg) => {
            const postID = msg.postedBy;
            const { data: by, error: byError } = await supabase
              .from("posts")
              .select("*, events(*), islands(*)")
              .eq("id", postID)
              .eq("status", false);

            if (byError) {
              console.error("送信者取得失敗");
            } else {
              if (by.length > 0) {
                const Object = {
                  ...msg,
                  by: by[0],
                };
                return Object;
              }
            }
          });

          Promise.all(promises)
            .then((results) => {
              const Objects = results.filter((result) => result !== undefined);

              console.log(Objects);
              setMessages(Objects);
            })
            .catch((error) => {
              console.error("メッセージ情報取得失敗", error);
            });
        } else {
          console.log("受信メッセージはありません");
        }
      }
    }
  };

  useEffect(() => {
    fetchMsg();
  }, []);

  // 既読に変更し、メッセージ全文確認ページへ遷移
  const readHandler = async (messageId) => {
    const { error } = await supabase
      .from("messages")
      .update({ isRead: true })
      .eq("id", messageId);
    if (error) {
      console.error("Failed to update 'isRead' field:", error);
    } else {
      navigate(`/island/message/islandPostMessage/${messageId}`);
    }
  };

  return (
    <>
      <div className={styles.userPostBack}>
        <h1>POST</h1>
        <div className={styles.postMessageBack}>
          <h2>受信メッセージ✉️</h2>

          {messages.length === 0 ? (
            <p>受信メッセージはありません</p>
          ) : (
            messages.map((message) => (
              <div className={styles.message}>
                <div className={styles.flex}>
                  <img
                    className={styles.icon}
                    src={
                      (message.by.events && message.by.events.thumbnail) ||
                      (message.by.islands && message.by.islands.thumbnail) ||
                      "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-08T07%3A12%3A33.854Z"
                    }
                    alt=" Thumbnail"
                  ></img>
                  <div className={styles.right}>
                    <div className={styles.circleSide}>
                      <p
                        className={classNames(styles.name, {
                          [styles.unreadName]: !message.isRead,
                        })}
                      >
                        {message.isRead === false && (
                          <div className={styles.unreadCircle}>未読</div>
                        )}
                        <span>
                          {(message.by.islands &&
                            message.by.islands.islandName) ||
                            (message.by.events && message.by.events.eventName)}
                        </span>
                      </p>
                    </div>
                    <p
                      className={classNames({
                        [styles.unread]: !message.isRead,
                      })}
                    >
                      ＞ {message.message}
                    </p>
                    <p>
                      {format(new Date(message.sendingDate), "yyyy年MM月dd日")}
                    </p>
                  </div>
                </div>

                <button onClick={() => readHandler(message.id)}>表示</button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
