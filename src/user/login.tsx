import React from "react";
import Menubar from "../components/menubarIsland";
import styles from "../styles/login.module.css";

export default function Login() {
  const loginHandler = () => {};
  return (
    <>
      <div className={styles.box}>
        <div className={styles.imgCovered}>
          <img
            src="/login/loginCounter.png"
            alt="Login Counter"
            className={styles.img}
          />
        </div>
        <div className={styles.board}>
          <h4 className={styles.boardTitle}>ログイン申請書</h4>
          <div>
            <input
              type="email"
              id="email"
              placeholder="ログインID（登録メールアドレス）"
              className={styles.inputA}
            />
          </div>

          <div>
            <input
              type="password"
              id="pass"
              placeholder="パスワード"
              className={styles.inputB}
            />
          </div>
        </div>

        <button onClick={loginHandler} className={styles.button}>
          ログイン
        </button>
      </div>
    </>
  );
}
