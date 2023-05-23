import React, { useState } from "react";
import Menubar from "../components/menubarIsland";
import styles from "../styles/user/login.module.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const data = {
    mailAddress: email,
    password: password,
  };

  const loginHandler = async () => {
    // let { data } = await supabase.from('users').select()eq('email', email)
    // .eq('password', password);
  };
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
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
            />
          </div>

          <div>
            <input
              type="password"
              id="pass"
              placeholder="パスワード"
              className={styles.inputB}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              required
              pattern=".{8,16}"
              title="8文字以上16文字以下"
              autoComplete="off"
            />
          </div>
        </div>

        <button onClick={loginHandler} className={styles.button}>
          ログイン
        </button>

        <div>
          <Link to="/users/newUser" className={styles.link}>
            新規ユーザー登録はこちら
          </Link>
        </div>

        <h3 style={{ display: error ? "block" : "none" }}>
          ユーザーが見つかりません。もう一度入力してください。
        </h3>
      </div>
    </>
  );
}
