import React, { useState, useEffect } from "react";
import styles from "../../styles/createSendingMessage.module.css";
import { supabase } from "../../createClient";
import { useParams } from "react-router-dom";

export default function CreateResidentApplication({
  closeModal,
  table,
}: {
  closeModal: () => void;
  table: string;
}) {
  const params = useParams();
  const paramsID = parseInt(params.id);
  const [message, setMessage] = useState("");
  const [postedID, setPostedID] = useState(null);
  const [islandName, setIslandName] =useState("");

  useEffect(() => {
    fetchPost();
    fetchislnadName();
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

  const fetchislnadName = async () => {
    const { data: island, error: islandError } = await supabase
      .from("islands")
      .select("islandName")
      .eq("id", paramsID)
      .eq("status", false);
  
    if (islandError) {
      console.log(islandError, "エラーが発生しました");
    } else if (island && island.length > 0) {
      setIslandName(island[0].islandName);
      console.log(island[0].islandName);
    }
  };
  


  // messagesテーブルにメッセージを保存
  const saveMessage = async () => {
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
          console.error("メッセージの送信中にエラーが発生しました:", messagesError);
        } else {
          saveDataToApplications();
          closeModal();
        }
      };
      
      const saveDataToApplications = async () => {
        const { data: messages, error: messagesError } = await supabase
          .from("messages")
          .select("id")
          .eq("status", false);
        
        if (messagesError) {
          console.error("メッセージの取得中にエラーが発生しました:", messagesError);
          return;
        }
        
        const applicationsToSave = messages.map((message) => ({
          messageID: message.id,
        }));
        
        if (applicationsToSave.length === 0) {
          console.log("保存するデータがありません。");
          return;
        }
        
        const { data: savedApplications, error: saveError } = await supabase
          .from("applications")
          .insert(applicationsToSave);
        
        if (saveError) {
          console.error("データの保存中にエラーが発生しました:", saveError);
        } else {
          console.log("データが正常に保存されました:", savedApplications);
        }
};    

const addHandler = () => {
  saveMessage();
}; 


  return (
    <>
    {islandName &&
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
      }
    </>
  );
}
