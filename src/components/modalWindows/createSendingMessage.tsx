import React, { useEffect, useState } from "react";
import styles from "../../styles/createSendingMessage.module.css";
import { supabase } from "../../createClient";
import { useParams } from "react-router-dom";
import GetCookieID from "../cookie/getCookieId";
import FetchPost from "./fetchPost";
import FetchIslandName from "./fetchIslandName";
import SendMessage from "./sendMessage";

export default function CreateSendingMessage({
  closeModal,
  table,
}: {
  closeModal: () => void;
  table: string;
}) {
  const [message, setMessage] = useState("");
  const [postID, setPostID] = useState();
  const [postedID, setPostedID] = useState();
  const [islandName, setIslandName] = useState("");
  const params = useParams();
  const paramsID = parseInt(params.id);
  const userID = GetCookieID();

  useEffect(() => {
    fetchPostData();
    fetchIslandNameData();
  }, []);

  // posts, postedByに入れるため、送信する側のpostIDを取得する
  const fetchPostData = async () => {
    await FetchPost(userID, setPostedID);
  };

  // 島名を取得してモーダルウィンドウに表示
  const fetchIslandNameData = async () => {
    await FetchIslandName(supabase, paramsID, setIslandName);
  };

  // messagesテーブルにメッセージを保存
  const sendMessageData = async () => {
    await SendMessage(postID, message, postedID, closeModal);
    console.log(postedID)
  };


  // メッセージを送信するための処理を実行
  const addHandler = () => {
    sendMessageData();
  };

  return (
    <>
      {islandName && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.allContents}>
              <img
                src="/modalWindow/close.png"
                alt="×ボタン"
                onClick={closeModal}
                className={styles.close}
              />
              <div className={styles.main}>
                <div className={styles.title}>
                  <h3 className={styles.h3}>{islandName}島</h3>
                  <p className={styles.messageName}>メッセージを送る</p>
                </div>
                <div className={styles.input}>
                  <label htmlFor="threadName">コメント</label>
                  <br />
                  <textarea
                    name="text"
                    className={styles.textSending}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div>
                <button onClick={addHandler} className={styles.btn}>
                  送信する
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

