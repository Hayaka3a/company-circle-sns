import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import firebase from "firebase/compat/app";
import styles from "../styles/Chat.module.css";
import GetCookieID from "./cookie/getCookieId";
import { supabase } from "../createClient";

const SendMessages = ({ threadID }: { threadID: number }) => {
  const [text, setText] = useState("");
  const [user, setUser] = useState<UserData | undefined>(undefined);

  // ログインしているユーザーの情報を変数に格納する
  const userID = GetCookieID();

  interface UserData {
    familyName: string;
    firstName: string;
    icon: string;
  }

  useEffect(() => {
    const fetchUser = async () => {
      let { data: userData } = (await supabase
        .from("users")
        .select("*")
        .eq("id", userID)) as { data: UserData[] };

      setUser(userData[0]);
    };
    fetchUser();
  }, []);

  // userがundefinedの場合エラーを回避
  const userName = `${user?.familyName}${user?.firstName}`;
  const icon = user?.icon || "/images/icon.png";

  // 送信ボタンをクリックしたとき
  function handleClick(e: { preventDefault: () => void }) {
    e.preventDefault();

    firestore.collection("chats").add({
      text: text,
      postedBy: userName,
      postedAt: firebase.firestore.FieldValue.serverTimestamp(),
      threadID: threadID,
      icon: icon,
    });
    setText("");
  }
  return (
    <div>
      <div>
        <div className={styles.sendMsg}>
          <input
            type="text"
            placeholder="メッセージを入力してください"
            maxLength={500}
            className={styles.inputText}
            onChange={(e: { target: { value: string } }) => {
              setText(e.target.value);
            }}
            value={text}
          />
          <div className={styles.btnWrapper}>
            <button
              onClick={handleClick}
              className={styles.btn}
              disabled={text === "" && true}
            >
              送信
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessages;
