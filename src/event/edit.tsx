import React from "react";
import LogSt from "../components/cookie/logSt";
import styles from "../styles/eventDetail.module.css";


export default function EventEdit() {
  LogSt();
  return(
    <div className={styles.flex}>
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

          <button id={styles.edit_btn}>編集</button>
        </div>
      </div>
    </div>
  );
}
