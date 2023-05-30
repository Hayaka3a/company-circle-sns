import { useState } from "react";
import styles from "../../styles/modalWindows/quit.module.css";
import QuitDone from "./quitDone";

export default function QuitConf({
  close2Modal,
  nextOpen2,
}: {
  close2Modal: () => void;
  nextOpen2: () => void;
}) {
  const nextHandler = () => {
    nextOpen2();
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.allContents}>
            <img
              src="/modalWindow/close.png"
              alt="×ボタン"
              onClick={close2Modal}
              className={styles.close}
            />
            <div className={styles.main}>
              <div className={styles.title}>
                アカウントを本当に削除してもよろしいですか？
              </div>
              <div>
                <p>
                  削除するために下記のテキストボックスに名前をフルネームで入力してください
                </p>
                <p>※苗字と名前の間にスペースを入れずに入力してください</p>
              </div>
              <div>
                <input type="text"></input>
              </div>
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
