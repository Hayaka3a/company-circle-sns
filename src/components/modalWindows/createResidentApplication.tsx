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
  const params = useParams();
  const paramsID = parseInt(params.id);
  const [message, setMessage] = useState("");
  const [islandName, setIslandName] = useState("");
  const [postedID, setPostedID] = useState(null);
  const [postID, setPostID] = useState(null);

  const userID = GetCookieID();

  useEffect(() => {
    fetchPost();
    fetchislnadName();
    fetchIslandPost();
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

  const fetchIslandPost = async () => {
    const { data: post, error: postError } = await supabase
      .from("posts")
      .select("id")
      .eq("islandID", paramsID);

    if (postError) {
      console.error(postError, "エラー");
    }

    if (post && post.length > 0) {
      const postId = post[0].id;
      setPostID(postId);
    } else {
      console.log("該当する投稿が見つかりませんでした");
    }
  };

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
      closeModal();
    }
  };

  const addHandler = () => {
    saveMessage();
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
