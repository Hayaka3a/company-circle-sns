import React, { useEffect, useState } from "react";
import LogSt from "../components/cookie/logSt";
import MenubarEvent from "../components/menubarEvent";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../createClient";
import styles from "../styles/island/island_post.module.css";
import { format } from "date-fns";
import classNames from "classnames";

export default function EventPost() {
  LogSt();
  const params = useParams();
  const paramsID = parseInt(params.id);
  const [messages, setMessages] = useState([]);

  //メッセージ受信
  const fetchMsg = async () => {
    // イベントポスト番号を検索
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("status", false)
      .eq("eventID", paramsID);

    if (error) {
      console.error("post情報取得失敗");
    } else {
      const postID = data[0].id;
      // イベントポストに届いているメッセージ検索
      const { data: msgs, error: msgError } = await supabase
        .from("messages")
        .select("*")
        .eq("postID", postID)
        .eq("status", false)
        .eq("isRead", false);

      if (msgError) {
        console.error("msg情報取得失敗");
      } else {
        //msgsのオブジェクトデータごとにpost情報を取得
        const userPromises = msgs.map(async (msg) => {
          const postID = msg.postedBy;

          const { data: by, error: byError } = await supabase
            .from("posts")
            .select("*, users(*)")
            .eq("id", postID)
            .eq("status", false)
            .single();

          if (byError) {
            console.error("送信者取得失敗");
          } else {
            // ユーザーネームとユーザーのポスト情報がついているbyとmsgsを結び付ける
            const userObject = {
              ...msg,
              by: by,
            };
            return userObject;
          }
        });
        // 全てのデータがそろうのを待ってから挿入
        const resolvedUserData = await Promise.all(userPromises);
        setMessages(resolvedUserData);
      }
    }
  };

  useEffect(() => {
    fetchMsg();
  }, []);
  return (
    <>
      <MenubarEvent />
      <div className={styles.islandPostBack}>
        <h1>POST</h1>

        <div className={styles.postMessageBack}>
          <h2>受信メッセージ✉️</h2>
          {messages.length === 0 ? (
            <p>受信メッセージはありません</p>
          ) : (
            messages.map((message) => (
              <div className={styles.message} key={message.id}>
                <div className={styles.flex}>
                  <img
                    src={
                      message.by.users.icon ||
                      "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-08T07%3A12%3A33.854Z"
                    }
                    alt="アイコン"
                  />
                  <div className={styles.right}>
                    <h3
                      className={classNames(styles.username, {
                        [styles.unread]: !message.isRead,
                      })}
                    >
                      {message.by.users.familyName}&nbsp;
                      {message.by.users.firstName}
                    </h3>
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
                <Link to={`/island/message/user_message/${message.id}`}>
                  <button>表示</button>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
