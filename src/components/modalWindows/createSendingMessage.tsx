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
  const [islandName, setIslandName] = useState("");
  const params = useParams();
  const paramsID = parseInt(params.id);
  const userID = GetCookieID();

  useEffect(() => {
    fetchPost();
    fetchIslandName();
  }, []);

  const fetchPost = async () => {
    // userIDから該当のPostIDを割り出す
    const { data: postsData, error: postError } = await supabase

      .from("posts")
      .select("id")
      .eq("userID", userID)
      .eq("status", false);

    // // islandIDから該当のPostIDを割り出す
    // const { data: posts, error: postError } = await supabase
    // .from("posts")
    // .select("id")
    // .eq("islandID", paramsID)
    // .eq("status", false);

    if (postError) {
      console.log(userID);
      // console.log(paramsID);
      console.log(postError, "ポストエラー");
    }
    setPosts(postsData[0]?.id || 0);


    // PostedByに入れるため、送信する側のPostIDを取得する
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

    setPostedID(postedBy[0]?.id || 0);

  };

  const fetchIslandName = async () => {
    const { data: island, error: islandError } = await supabase
      .from("islands")
      .select("islandName")
      .eq("id", paramsID)
      .eq("status", false);

    if (islandError) {
      console.log(islandError, "アイランドエラー");
    } else if (island && island.length > 0) {
      setIslandName(island[0].islandName);
    }
  };

  const sendMessage = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const { data, error } = await supabase.from("messages").insert([
      {
        postID: postedID,
        message: message,
        scout: false,
        isRead: false,
        isAnswered: false,
        postedBy: posts,
        status: false,

        sendingDate: formattedDate,
      },
    ]);

    if (error) {
      console.error(error, "メッセージの送信中にエラーが発生しました:");
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
