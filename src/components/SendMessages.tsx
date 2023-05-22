import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import firebase from "firebase/compat/app";
import styles from "../styles/Chat.module.css";

const SendMessages = () => {
  const [text, setText] = useState("");

  // ログインしているユーザーの情報を変数に格納する
  const userName = "シャチ";
  const icon = "/images/icon.png";

  // propsで渡す
  const threadID = 1;

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
