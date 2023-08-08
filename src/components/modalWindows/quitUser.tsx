import { useEffect, useState } from "react";
import styles from "../../styles/modalWindows/quit.module.css";
import QuitConf from "./quitConf/jsxQuitConf";

// closeModalは×ボタン押したときの関数、nextOpenは完了系ボタン（アカウントを削除する）を押したときの関数
export default function QuitUser({
  closeModal,
  nextOpen,
}: {
  closeModal: () => void;
  nextOpen: () => void;
}) {
  // 現在のウィンドウを閉じ、入力ボックスウィンドウを表示し、
  const nextHandler = () => {
    nextOpen();
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
              <div className={styles.title}>アカウントを削除しますか？</div>
            </div>
            <div>
              <button onClick={nextHandler}>アカウントを削除する</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
