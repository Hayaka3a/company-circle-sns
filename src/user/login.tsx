import React, { useEffect, useState } from "react";
import styles from "../styles/user/login.module.css";
import { Link } from "react-router-dom";
import { supabase } from "../createClient";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Login() {
  const navigate = useNavigate(); // useNavigateフックで画面遷移
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loginStatus] = useCookies(["loginSt"]);

  // ログイン済みの場合、トップページにリダイレクト
  useEffect(() => {
    const status = loginStatus.loginSt;
    if (status == "true") {
      navigate("/");
      window.location.reload();
    }
  }, []);

  const newUser = () => {
    navigate("/user/newUser");
    window.location.reload();
  };

  const loginHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("mailAddress", email)
        .eq("password", password);

      if (error) {
        console.log("データベースエラー:", error.message);
        return null;
      }
      // ユーザーが見つかった場合
      if (data && data.length > 0) {
        const userId = data[0].id;

        // Cookieの有効期限1日
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);

        // Cookie設定
        document.cookie = `id=${userId};  expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = `loginSt=true;  expires=${expirationDate.toUTCString()}; path=/`;

        navigate("/");
        window.location.reload();

        // ユーザーが見つからなかった場合
      } else {
        setVisible(true);
        document.cookie =
          "loginSt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    } catch (error) {
      console.log("エラー:", error);
    }
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
                setVisible(false);
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
                setVisible(false);
              }}
              required
              pattern=".{8,16}"
              title="8文字以上16文字以下"
              autoComplete="off"
            />
          </div>
          <div>
            <button onClick={loginHandler} className={styles.button}>
              ログイン
            </button>
          </div>
        </div>

        <div>
          <button onClick={newUser}>新規ユーザー登録はこちら</button>
        </div>

        <h3 style={{ display: visible ? "block" : "none" }}>
          ユーザーが見つかりません。もう一度入力してください。
        </h3>
      </div>
    </>
  );
}
