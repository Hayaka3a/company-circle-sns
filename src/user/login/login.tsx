import React, { useEffect, useState } from "react";
import styles from "../../styles/user/login.module.css";
import { Link } from "react-router-dom";
import { supabase } from "../../createClient";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import LoginHandler from "./loginHandler";

export default function Login() {
  const navigate = useNavigate(); // useNavigateフックで画面遷移
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loginStatus] = useCookies(["loginSt"]);

  // ログイン済みの場合、トップページにリダイレクト
  useEffect(() => {
    const status = loginStatus.loginSt;
    if (status === "true") {
      navigate("/");
      window.location.reload();
    }
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.board}>
        <img src="/images/logo.png" className={styles.logo} alt="logo" />

        <div>
          <input
            type="email"
            id="email"
            placeholder="ログインID（登録メールアドレス）"
            maxLength={250}
            className={styles.inputA}
            onChange={(e) => {
              setEmail(e.target.value);
              setVisible(false);
            }}
          />
        </div>
        <div>
          <input
            type="password"
            id="pass"
            placeholder="パスワード"
            maxLength={16}
            className={styles.inputB}
            onChange={(e) => {
              setPassword(e.target.value);
              setVisible(false);
            }}
            required
            pattern=".{8,16}"
            title="8文字以上16文字以下"
          />
        </div>
        <div className={styles.buttonBox}>
          <h3
            style={{ display: visible ? "block" : "none" }}
            className={styles.errorMessage}
          >
            ユーザーが見つかりませんもう一度入力してください
          </h3>
          <button
            onClick={() =>
              LoginHandler({ email, password, setVisible, navigate })
            }
            className={styles.button}
            disabled={!email || !password}
          >
            ログイン
          </button>
        </div>
        <div className={styles.linkBox}>
          <Link to={"/user/newUser"} className={styles.link}>
            新規ユーザー登録
          </Link>
        </div>
      </div>
    </div>
  );
}
