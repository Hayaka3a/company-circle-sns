import React, { useEffect, useState } from "react";
import styles from "../../styles/createSendingMessage.module.css";
import { supabase } from "../../createClient";
import { useParams } from "react-router-dom";
import GetCookieID from "../cookie/getCookieId";


export default function CreateSendingMessage({
    closeModal,
    table,
}: {
    closeModal: () => void;
    table: string;
}) {
  const [message, setMessage] = useState("");
  const [postedID, setPostedID] = useState(0);
  const [posts, setPosts] = useState(0);
  const [eventName, setEventName ] = useState("");
  const params = useParams();
  const paramsID = parseInt(params.id);
  const userID = GetCookieID();


  useEffect(() => {
    fetchPost();
    fetchEventName();
  }, []);


  const fetchPost = async () => {
    // userIDから該当のPostIDを割り出す
    const { data: posts, error: postError } = await supabase
    .from("posts")
    .select("id")
    .eq("userID", userID)
    .eq("status", false);
    if (postError) {
      console.log(userID);
      console.log(postError, "ポストエラー");
    }
    setPosts(posts[0].id);

    // PostedByに入れるため、送信する側のPostIDを取得する
    const { data: postedBy, error: postedByError } = await supabase
      .from("posts")
      .select("id")
      .eq(`${table}ID`, paramsID)
      .eq("status", false);
    if (postedByError) {
      console.log(postedByError, "ポストバイエラー");
    }
    setPostedID(postedBy[0].id);
  };

  // イベント名を取得してモーダルウィンドウに表示
  const fetchEventName = async () => {
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("eventName")
      .eq("id", paramsID)
      .eq("status", false);
  
    if (eventError) {
      console.log(eventError, "エラーが発生しました");
    } else if (event && event.length > 0) {
      setEventName(event[0].eventName);
      console.log(eventName)
    }
  };
  

  // messagesテーブルにメッセージを保存
  const sendMessage = async () => {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          postID: posts,
          message: message,
          scout: false,
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
    {eventName && 
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
                <h3 className={styles.h3}>{eventName}</h3>
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
      }
    </>
  );
}
