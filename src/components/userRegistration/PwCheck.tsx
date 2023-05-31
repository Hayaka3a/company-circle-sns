import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../../styles/newUser.module.css";

export default function PwCheck({
  pw,
  setPw,
  com,
}: {
  pw: string;
  setPw: Dispatch<SetStateAction<string>>;
  com: string;
}) {
  const [error, setError] = useState("");

  const handlePwChange = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z0-9_]{8,16}$/;
    setPw(value);
    // 一文字でも入力されたらエラー削除
    if (!pattern.test(value)) {
      setError("※半角英数字と_のみ入力してください");
    } else {
      setError("");
    }
  };
  const handleNameBlur = () => {
    if (pw.trim() === "") {
      setError("※入力必須項目です");
    } else if (com && com !== pw) {
      setError("※パスワードと確認パスワードが一致しません");
    } else {
      setError("");
    }
  };
  useEffect(() => {
    handleNameBlur();
  }, [pw, com]);

  return (
    <>
      <input
        // type="password"
        className={`${styles.inputA} ${error ? styles.errorInput : ""}`}
        maxLength={300}
        value={pw}
        onChange={handlePwChange}
        onBlur={handleNameBlur}
      />
      {error && (
        <div>
          <span className={styles.span}>{error}</span>
        </div>
      )}
    </>
  );
}
