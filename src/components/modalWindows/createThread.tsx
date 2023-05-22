import React from "react";
import styles from "../../styles/createThread.module.css";

export default function CreateThread({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const addHandler = () => {};
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
                <h3 className={styles.h3}>○○島</h3>
                <p className={styles.p}>新規スレッド作成</p>
              </div>
              <div className={styles.input}>
                <label htmlFor="threadName">スレッド名</label>
                <input type="text"></input>
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
