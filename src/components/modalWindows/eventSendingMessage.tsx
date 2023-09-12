import { useEffect, useState } from "react";
import styles from "../../styles/createSendingMessage.module.css";
import { supabase } from "../../createClient";
import { useParams } from "react-router-dom";
import GetCookieID from "../cookie/getCookieId";
import FetchEventPost from "./fetchEventPost";
import FetchEventName from "./fetchEventName";
import SendMessage from "./sendMessage";
import FetchPost from "./fetchPost";

export default function EventSendingMessage({
  closeModal,
  table,
}: {
  closeModal: () => void;
  table: string;
}) {
  const [message, setMessage] = useState("");
  const [postedID, setPostedID] = useState(null);
  const [postID, setPostID] = useState();
  const [eventName, setEventName] = useState("");
  const params = useParams();
  const paramsID = parseInt(params.id);

  const userID = GetCookieID();

  useEffect(() => {
    fetchPostData();
    fetchEventNameData();
    fetchEventPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // postedByに入れるため、送信する側のpostIDを取得する
  const fetchPostData = async () => {
    await FetchPost(userID, setPostedID);
  };

  // イベント名を取得してモーダルウィンドウに表示
  const fetchEventNameData = async () => {
    await FetchEventName(supabase, paramsID, setEventName);
  };

  // paramsIDに基づいて、該当のメッセージのIDを取得する
  const fetchEventPostData = async () => {
    await FetchEventPost(paramsID, setPostID);
  };

  // messagesテーブルにメッセージを保存
  const sendMessageData = async () => {
    await SendMessage(postID, message, postedID, closeModal);
  };

  // メッセージを送信するための処理を実行
  const addHandler = () => {
    sendMessageData();
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
                onClick={closeModal}
                className={styles.close}
              />
              <div className={styles.main}>
                <div className={styles.title}>
                  <h3 className={styles.h3}>{eventName}</h3>
                  <p className={styles.messageName}>メッセージ</p>
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
