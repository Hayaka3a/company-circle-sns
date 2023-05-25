import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import styles from "../styles/Chat.module.css";
import { chat } from "../types/chat";
import SendMessages from "./SendMessages";
import { supabase } from "../createClient";

const Chat = () => {
  const [threadTitle, setThreadTitle] = useState("");
  const { id } = useParams();
  const threadID = Number(id);
  // session?に保存されてるユーザーネーム
  const userName = "シャチ";

  // threadTitleを取得
  useEffect(() => {
    const fetchThread = async () => {
      let { data: threads, error } = await supabase
        .from("threads")
        .select(`id, threadTitle`)
        .eq("id", id);
      if (threads) {
        setThreadTitle(threads[0].threadTitle);
      }
    };

    fetchThread();
  }, []);

  const [messages, setMessages] = useState<chat[]>([]);

  useEffect(() => {
    firestore
      .collection("chats")
      .where("threadID", "==", threadID)
      .orderBy("postedAt", "desc")
      .limit(20)
      .onSnapshot((snapShot) => {
        const snapShots = snapShot.docs.map((doc) => {
          // データを追加した直後はpostedAtがnullになるため仮のtimeStampを仮置きするオプション
          let data = doc.data({ serverTimestamps: "estimate" });
          data = { ...data, chatID: doc.id };
          // timeStampをDate型に変換
          const tmp = {
            ...data,
            postedAt: data.postedAt.toDate(),
          };
          // Date型をyy/mm/dd hh:mmの形に変換
          return {
            ...tmp,
            postedAt: tmp.postedAt.toLocaleString([], {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });
        setMessages(snapShots as chat[]);
      });
  }, []);

  return (
    <main className={styles.content}>
      <div>
        <div className={styles.titleWrapper}>
          <p className={styles.title}>{threadTitle}</p>
        </div>
        {messages.map((chat: chat) => (
          <div className={styles.msgs} key={chat.chatID}>
            <div>
              <p
                className={`${styles.userInfo} ${
                  chat.postedBy === userName
                    ? `${styles.sentUser}`
                    : `${styles.receivedUser}`
                }`}
              >
                {chat.postedBy}
              </p>
              <div
                key={chat.postedBy}
                className={`${styles.msg} ${
                  chat.postedBy === userName
                    ? `${styles.sent}`
                    : `${styles.received}`
                }`}
              >
                <img
                  src={chat.icon}
                  alt="ユーザーアイコン"
                  className={styles.icon}
                />
                <p className={styles.text}>{chat.text}</p>
              </div>
            </div>
            <p
              className={`${styles.userInfo} ${
                chat.postedBy === userName
                  ? `${styles.sentUser}`
                  : `${styles.receivedUser}`
              }`}
            >
              {chat.postedAt}
            </p>
          </div>
        ))}
        <SendMessages threadID={threadID} />
      </div>
    </main>
  );
};

export default Chat;
