import { useEffect, useState } from "react";
import styles from "../../../styles/createThread.module.css";
import ThreadCreationHandler from "./threadCreationHandler";
import ThreadFetch from "./threadFetch";

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
  const [contentName, setContentName] = useState(""); // Renamed state variable

  useEffect(() => {
    ThreadFetch(islandID, eventID)
      .then((data) => {
        setContentName(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [islandID, eventID]);

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
                {islandID && <h3 className={styles.h3}>{contentName}島</h3>}
                {eventID && <h3 className={styles.h3}>{contentName}</h3>}
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
              <ThreadCreationHandler
                threadTitle={threadTitle}
                islandID={islandID}
                eventID={eventID}
                closeModal={closeModal}
                onThreadCreated={() => window.location.reload()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
