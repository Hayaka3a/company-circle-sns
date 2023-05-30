import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/island/user_message_post.module.css";
import LogSt from "../../components/cookie/logSt";

export default function UserMessage() {
  LogSt();

  return (
    <div className={styles.back}>
      <Link to={`/island/post`}>
        <img
          src="/island/close_btn.png"
          alt="閉じるボタン"
          className={styles.close_btn}
        />
      </Link>
      <div className={styles.receive}>
        <div className={styles.flex}>
          <p className={styles.from}>from:</p>
          <img src="/user/user_icon.png" alt="アイコン" />
          <h3 className={styles.userName}>ユーザーネーム</h3>
          <p className={styles.receiving_time}>受信日時:20XX年XX月XX日</p>
        </div>
        <p className={styles.text_body}>
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          <br />
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          <br />
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          <br />
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          <br />
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          <br />
        </p>
      </div>
      <div className={styles.reply}>
        <div className={styles.flex}>
          <div className={styles.reply_btn}>
            <Link to={``}>
              <button>返信する</button>
            </Link>
          </div>
          <p className={styles.send_to}>to:</p>
          <h3 className={styles.reply_userName}>ユーザーネーム</h3>
        </div>
        <div id={styles.text_area}>
          <textarea name="reply"></textarea>
        </div>
      </div>
    </div>
  );
}
