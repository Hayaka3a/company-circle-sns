import React, { useState, useEffect } from "react";
import styles from "../../styles/createSendingMessage.module.css";
import { supabase } from "../../createClient";
import { useParams } from "react-router-dom";

export default function CreateResidentApplication({
  closeResidentModal,
  table,
  islandName,
}: {
  closeResidentModal: () => void;
  table: string;
  islandName: string;
}) {
  const params = useParams();
  const paramsID = parseInt(params.id);
  const [message, setMessage] = useState("");
  const [postedID, setPostedID] = useState(null);

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

  // messagesテーブルとapplicationsテーブルにメッセージを保存
  const saveMessage = async () => {
    try {
      const { data: messagesData, error: messagesError } = await supabase
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

      if (messagesError) {
        console.error("メッセージの送信中にエラーが発生しました:");
      } else {
        console.log("データが正常に送信されました");
        closeResidentModal();
      }
    } catch (error) {
      console.error("データの送信中にエラーが発生しました:", error.message);
    }
  };

  const addHandler = () => {
    saveMessage();
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.allContents}>
            <img
              src="/modalWindow/close.png"
              alt="×ボタン"
              onClick={closeResidentModal}
              className={styles.close}
            />
            <div className={styles.main}>
              <div className={styles.title}>
                <h3 className={styles.h3}>{islandName}島</h3>
                <p className={styles.messageName}>住民申請</p>
              </div>
              <div className={styles.input}>
                <label htmlFor="threadName">コメント</label>
                <br />
                <textarea
                  name="text"
                  className={styles.textSending}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
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
