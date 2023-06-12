import React, { useState, useEffect } from "react";
import styles from "../../styles/createSendingMessage.module.css";
import { supabase } from "../../createClient";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import GetCookieID from "../cookie/getCookieId";

export default function CreateResidentApplication({
  closeEntryModal,
  table,
}: {
  closeEntryModal: () => void;
  table: string;
}) {
  const params = useParams();
  const paramsID = parseInt(params.id);
  const [message, setMessage] = useState("");
  const [eventName, setEventName] = useState("");
  const [postedID, setPostedID] = useState(null);
  const [postID, setPostID] = useState();

  const userID = GetCookieID();

  useEffect(() => {
    fetchPost();
    fetchEventName();
    fetchEventPost();
  }, []);

  const fetchPost = async () => {
    const { data: postedBy, error: postedByError } = await supabase
      .from("posts")
      .select("id")
      .eq("userID", userID);

    if (postedByError) {
      console.log(postedByError, "エラー");
    }

    if (postedBy && postedBy.length > 0 && postedBy[0].id) {
      setPostedID(postedBy[0].id);
    } else {
      console.log("PostedByIDが取得できません");
    }
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
    }
  };

  const fetchEventPost = async () => {
    const { data: post, error: postError } = await supabase
      .from("posts")
      .select("id")
      .eq("eventID", paramsID);

    if (postError) {
      console.error(postError, "エラー");
    }

    if (post && post.length > 0) {
      const postId = post[0].id; // ローカルの変数名をpostIdに修正
      setPostID(postId);
    } else {
      console.log("該当する投稿が見つかりませんでした");
    }
  };

  // messagesテーブルにメッセージを保存
  const saveMessage = async () => {
    const { data, error } = await supabase.from("messages").insert([
      {
        postID: postID,
        message: message,
        scout: false,
        isRead: false,
        isAnswered: false,
        postedBy: postedID,
        status: false,
      },
    ]);

    if (error) {
      console.log(error, "エラー");
    } else {
      console.log("データが正常に送信されました");
      closeEntryModal();
    }
  };

  const addHandler = () => {
    saveMessage();
  };

  return (
    <>
      {eventName && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.allContents}>
              <img
                src="/modalWindow/close.png"
                alt="×ボタン"
                onClick={closeEntryModal}
                className={styles.close}
              />
              <div className={styles.main}>
                <div className={styles.title}>
                  <h3 className={styles.h3}>{eventName}</h3>
                  <p className={styles.messageName}>イベント参加申請</p>
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
      )}
    </>
  );
}