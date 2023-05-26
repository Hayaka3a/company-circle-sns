import React from "react";
import styles from "../styles/island/island_post.module.css";
import { Link, useParams } from "react-router-dom";
export default function IslandPost() {
  const params = useParams();
  const paramsID = parseInt(params.id);

  return (
    <>
      <div className={styles.islandPostBack}>
        <h1>POST</h1>
        <Link to={`/island/post/entryPermit/${paramsID}`}>
          <button>許可待ちの住民申請</button>
        </Link>
        <Link to={``}>
          <button>スカウトを送る</button>
        </Link>
        <div className={styles.postMessageBack}>
          <h2>受け取ったメッセージ</h2>
          <div className={styles.message}>
            <div className={styles.flex}>
              <img src="/user/user_icon.png" alt="アイコン" />
              <div className={styles.right}>
                <p className={styles.username}>ユーザーネーム</p>
                <p>テキストテキストテキストテキストテキストテキスト...</p>
              </div>
            </div>
            <Link to={`/island/message/user_message`}>
              <button>表示</button>
            </Link>
          </div>
          <div className={styles.message}>
            <div className={styles.flex}>
              <img src="/user/user_icon.png" alt="アイコン" />
              <div className={styles.right}>
                <p className={styles.username}>ユーザーネーム</p>
                <p>テキストテキストテキストテキストテキストテキスト...</p>
              </div>
            </div>
            <Link to={`/island/message/user_message`}>
              <button>表示</button>
            </Link>
          </div>
          <div className={styles.message}>
            <div className={styles.flex}>
              <img src="/user/user_icon.png" alt="アイコン" />
              <div className={styles.right}>
                <p className={styles.username}>ユーザーネーム</p>
                <p>テキストテキストテキストテキストテキストテキスト...</p>
              </div>
            </div>
            <Link to={`/island/message/user_message`}>
              <button>表示</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
