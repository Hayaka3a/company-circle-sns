import React, { useEffect, useState } from "react";
import styles from "../../styles/createThread.module.css";
import { supabase } from "../../createClient";

export default function CreateThread({
  closeModal,
  islandID,
}: {
  closeModal: () => void;
  islandID: number;
}) {
  const [threadTitle, setThreadTitle] = useState("");
  const [islandName, setIslandName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("islands")
        .select("islandName")
        .eq("id", islandID)
        .single();
      if (data) {
        setIslandName(data.islandName);
      }
    };

    fetchData();
  }, []);

  // スレッド作成送信
  // insert()メソッドはPromiseを返す非同期関数だからasync/awaitが必要
  const addHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("threads")
      .insert({ threadTitle, islandID, status: true });
    if (error) {
      console.error("Failed to create thread:", error.message);
    } else {
      console.log("スレッド作成成功");
      closeModal();
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
                <h3 className={styles.h3}>{islandName}島</h3>
                <p className={styles.p}>新規スレッド作成</p>
              </div>
              <div className={styles.input}>
                <label htmlFor="threadName">スレッド名</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setThreadTitle(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div>
              <button onClick={addHandler}>作成</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
