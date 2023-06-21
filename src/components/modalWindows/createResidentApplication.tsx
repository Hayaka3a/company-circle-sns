import React, { useState, useEffect } from "react";
import styles from "../../styles/createSendingMessage.module.css";
import { supabase } from "../../createClient";
import { useParams } from "react-router-dom";
import GetCookieID from "../cookie/getCookieId";

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
    fetchPost();
    fetchislnadName();
    fetchIslandPost();
  }, []);

  //ログインユーザーのポストIDを取得し、postByに格納
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

  //現在の島・イベントの名前を取得
  const fetchislnadName = async () => {
    if (table === "island") {
      const { data: island, error: islandError } = await supabase
        .from("islands")
        .select("islandName")
        .eq("id", paramsID)
        .eq("status", false);

      if (islandError) {
        console.log(islandError, "エラーが発生しました");
      } else if (island && island.length > 0) {
        setIslandName(island[0].islandName + "島");
      }
    } else {
      const { data: event, error: eventError } = await supabase
        .from("events")
        .select("eventName")
        .eq("id", paramsID)
        .eq("status", false);

      if (eventError) {
        console.log(eventError, "エラーが発生しました");
      } else if (event && event.length > 0) {
        setIslandName(event[0].eventName);
      }
    }
  };

  //島かイベントのポストを取得、postIDに格納
  const fetchIslandPost = async () => {
    const { data: post, error: postError } = await supabase
      .from("posts")
      .select("id")
      .eq(`${table}ID`, paramsID);

    if (postError) {
      console.error(postError, "エラー");
    }

    if (post && post.length > 0) {
      const postId = post[0].id;
      setPostID(postId);
    } else {
      console.log("該当するポストが見つかりませんでした");
    }
  };

  const saveMessage = async () => {
    const { error } = await supabase.from("messages").insert([
      {
        postID: postID,
        message: "参加申請",
        scout: false,
        isRead: false,
        isAnswered: false,
        postedBy: postedID,
        status: false,
      },
    ]);
    if (error) {
      console.log(error, "メッセージ追加エラー");
    } else {
      const { data: messageID, error: messageIDError } = await supabase
        .from("messages")
        .select("id")
        .eq("postID", postID)
        .eq("postedBy", postedID)
        .eq("status", false);
      if (messageIDError) {
        console.log(messageIDError, "メッセージID取得エラー");
      } else {
        const { error } = await supabase.from("applications").insert([
          {
            messageID: messageID[0].id,
            message: message,
            status: false,
          },
        ]);
        if (error) {
          console.log(error, "アプリケーションズ追加エラー");
        } else {
          closeModal();
        }
      }
    }
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
                <button onClick={saveMessage} className={styles.btn}>
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
