import React, { useEffect, useState } from "react";
import styles from "../../styles/createSendingMessage.module.css";
import { supabase } from "../../createClient";
import { useParams } from "react-router-dom";
import { table } from "node:console";


export default function CreateSendingMessage({
    closeModal,
    table,
}: {
    closeModal: () => void;
    table: string;
}) {
  const [message, setMessage] = useState("");
  const [postedID, setPostedID] = useState(null);
  const params = useParams();
  console.log(params);
  const paramsID = parseInt(params.id);
  

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    // PostedByに入れるため、送信する側のPostIDを取得する
    const { data: postedBy, error: postedByError } = await supabase
      .from("posts")
      .select("id")
      .eq(`${table}ID`, paramsID)
      .eq("status", false);
    if (postedByError) {
      console.log(postedByError, "エラー");
    }
    setPostedID(postedBy[0].id);
  };

  // messagesテーブルにメッセージを保存
  const sendMessage = async () => {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          postID: postedID,
          message: message,
          scout: true,
          isRead: false,
          isAnswered: false,
          postedBy: postedID,
          status: false,
        },
      ]);
    if (error) {
      console.error("メッセージの送信中にエラーが発生しました:");
    } else {
      console.log("データが正常に送信されました");
      closeModal();
    }
  };

  const addHandler = () => {
    sendMessage();
  };

  return (
    <>
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
                <h3 className={styles.h3}>○○島</h3>
                <p className={styles.messageName}>メッセージ</p>
              </div>
              <div className={styles.input}>
                <label htmlFor="threadName">コメント</label><br />
                <textarea 
                  name="text" 
                  className={styles.textSending}
                  onChange={(e) => setMessage(e.target.value)}
                >
                </textarea>
              </div>
            </div>
            <div className={styles.btn}>
              <button onClick={addHandler}>送信する</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
