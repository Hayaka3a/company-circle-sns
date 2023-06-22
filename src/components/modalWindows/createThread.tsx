import { useEffect, useState } from "react";
import styles from "../../styles/createThread.module.css";
import { supabase } from "../../createClient";

export default function CreateThread({
  closeModal,
  islandID,
  eventID,
}: {
  closeModal: () => void;
  islandID: number | null;
  eventID: number | null;
}) {
  const [threadTitle, setThreadTitle] = useState("");
  const [islandName, setIslandName] = useState("");
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // サークル（島）のスレッド作成の場合
      if (islandID) {
        const { data } = await supabase
          .from("islands")
          .select("islandName")
          .eq("id", islandID)
          .eq("status", false)
          .single();
        if (data) {
          setIslandName(data.islandName);
        }
        // イベントのスレッド作成の場合
      } else if (eventID) {
        const { data } = await supabase
          .from("events")
          .select("eventName")
          .eq("id", eventID)
          .eq("status", false)
          .single();
        if (data) {
          setEventName(data.eventName);
        }
      }
    };

    fetchData();
  }, [islandID, eventID]);

  // スレッド作成送信
  // insert()メソッドはPromiseを返す非同期関数だからasync/awaitが必要
  const addHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { error } = await supabase
      .from("threads")
      .insert({ threadTitle, islandID, eventID, status: false });
    if (error) {
      console.error("Failed to create thread:", error.message);
    } else {
      console.log("スレッド作成成功");
      closeModal();
      window.location.reload();
    }
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
                {/* サークル（島）のスレッド作成の場合 */}
                {islandID && <h3 className={styles.h3}>{islandName}島</h3>}
                {/* イベントのスレッド作詞の場合 */}
                {eventID && <h3 className={styles.h3}>{eventName}</h3>}
                <p className={styles.p}>新規スレッド作成</p>
              </div>
              <div className={styles.input}>
                <div className={styles.name}>
                  <label htmlFor="threadName">スレッド名</label>
                </div>
                <input
                  className={styles.text}
                  type="text"
                  onChange={(e) => {
                    setThreadTitle(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div>
              <button onClick={addHandler} className={styles.btn}>
                作成
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
