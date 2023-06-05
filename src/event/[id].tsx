import React, { useState } from "react";
import MenubarEvent from "../components/menubarEvent";
import styles from "../styles/eventDetail.module.css";
import CreateSendingMessage from "../components/modalWindows/createSendingMessage";
import LogSt from "../components/cookie/logSt";

export default function EventDetail() {
  const [isOpen, setIsOpen] = useState(false);

  // メッセージを送るを押した際の小窓画面（モーダルウィンドウ）の開閉
  // isOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  LogSt();

  return (
    <div className={styles.flex}>
      <MenubarEvent />
      <div className={styles.back}>
        <div className={styles.event_detail}>
          <h1>〇〇イベント</h1>
          <img src="/event_icon.png" className={styles.eventIcon} />
          <div>
            <label className={styles.detail}>開催日時</label>
            <p className={styles.center}>20XX年XX月XX日~20XX年XX月XX日</p>
          </div>

          <div>
            <label className={styles.detail}>イベント詳細</label>
            <div>
              <p className={styles.center}>
                テキストテキストテキストテキストテキスト
                <br />
                テキストテキストテキストテキストテキスト
                <br />
                テキストテキストテキストテキストテキスト
                <br />
                テキストテキストテキストテキストテキスト
                <br />
                テキストテキストテキストテキストテキスト
                <br />
              </p>
            </div>
          </div>

          <div>
            <label className={styles.detail}>参加島(サークル)</label>
            <p className={styles.center}>島名</p>
            <p className={styles.center}>島名</p>
          </div>

          <div className={styles.btn}>
            <button>参加申請</button>
            <button onClick={openModal}>メッセージを送る</button>
            {isOpen && (
              <CreateSendingMessage closeModal={closeModal} table="island" />
            )}
          </div>
          <button id={styles.edit_btn}>編集・削除</button>
        </div>
      </div>
    </div>
  );
}
