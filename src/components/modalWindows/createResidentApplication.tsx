import React, { useState, useEffect } from "react";
import styles from "../../styles/createSendingMessage.module.css";
import { supabase } from "../../createClient";
import { useParams } from "react-router-dom";
import GetCookieID from "../cookie/getCookieId";
import FetchPost from "./fetchPost";
import FetchIslandName from "./fetchIslandName";
import FetchIslandPost from "./fetchIslandPost";
import SaveMessage from "./saveMessage";

export default function CreateResidentApplication({
  closeModal,
  table,
}: {
  closeModal: () => void;
  table: string;
}) {
  //島もしくはイベントのID取得
  const params = useParams();
  const paramsID = Number(params.id);

  //ログインしているユーザーのIDを取得
  const user = GetCookieID();
  const userID = Number(user);

  const [message, setMessage] = useState("");
  const [islandName, setIslandName] = useState("");
  const [postedID, setPostedID] = useState(null);
  const [postID, setPostID] = useState(null);

  useEffect(() => {
    fetchPostData();
    fetchislnadNameData();
    fetchIslandPostData();
  }, []);

  //ログインユーザーのポストIDを取得し、postByに格納
  const fetchPostData = async () => {
    await FetchPost(userID, setPostedID);
  };

  //現在の島・イベントの名前を取得
  const fetchislnadNameData = async () => {
    await FetchIslandName(supabase, paramsID, setIslandName);
  };

  //島かイベントのポストを取得、postIDに格納
  const fetchIslandPostData = async () => {
    await FetchIslandPost(table, paramsID, setPostID);
  };

  const saveMessageData = async () => {
    await SaveMessage(postID, postedID, message, closeModal);
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
                  <h3 className={styles.h3}>{islandName}</h3>
                  <p className={styles.messageName}>住民申請</p>
                </div>
                <div className={styles.input}>
                  <label htmlFor="threadName">コメント</label>
                  <br />
                  <textarea
                    name="text"
                    maxLength={200}
                    className={styles.textSending}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div>
                <button onClick={saveMessageData} className={styles.btn}>
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
