import React, { useState } from "react";
import styles from "../styles/user/login.module.css";
import { Link } from "react-router-dom";
import { supabase } from "../createClient";
import { useNavigate } from "react-router-dom";
// import { enc, AES } from "crypto-js";

export default function Login() {
  const navigate = useNavigate(); // useNavigateフックで画面遷移
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

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
      if (data && data.length > 0) {
        // ユーザーが見つかった場合
        const userId = data[0].id;
        // const fName = data[0].firstName;
        // const lName = data[0].familyName;
        // const icon = data[0].icon;

        // 暗号化
        // const encryptedFname = AES.encrypt(fName, "encryptionKey").toString();
        // const encryptedLname = AES.encrypt(lName, "encryptionKey").toString();
        // const encryptedIcon = AES.encrypt(icon, "encryptionKey").toString();
        // console.log(encryptedFname, encryptedLname, encryptedIcon);

        // Cookieの有効期限1日
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);

        // Cookie設定
        document.cookie = `id=${userId};  expires=${expirationDate.toUTCString()}; path=/`;
        // document.cookie = `id=${userId}; fName="${encryptedFname}"; lName="${encryptedLname}"; icon="${encryptedIcon}"; expires=${expirationDate.toUTCString()}; path=/`;

        navigate("/");
        window.location.reload();
      } else {
        // ユーザーが見つからなかった場合
        console.log("ユーザーが見つかりません");
        setVisible(true);
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
          <Link to="/users/newUser" className={styles.link}>
            新規ユーザー登録はこちら
          </Link>
        </div>

        <h3 style={{ display: visible ? "block" : "none" }}>
          ユーザーが見つかりません。もう一度入力してください。
        </h3>
      </div>
    </>
  );
}
