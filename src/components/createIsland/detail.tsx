import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/createIsland.module.css";

export default function Detail({
  detail,
  setDetail,
}: {
  detail: string;
  setDetail: Dispatch<SetStateAction<string>>;
}) {
  const [error, setError] = useState("");

  const handleIslandNameChange = (e) => {
    setDetail(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (error) {
      setError("");
    }
  };

  const handleIslandNameBlur = () => {
    if (detail.trim() === "") {
      setError("※活動内容は入力必須項目です");
    } else {
      setError("");
    }
  };
  return (
    <>
      <input
        type="text"
        className={`${styles.inputA} ${error ? styles.errorInput : ""}`}
        maxLength={300}
        value={detail}
        onChange={handleIslandNameChange}
        onBlur={handleIslandNameBlur}
      />
      {error && (
        <div>
          <span className={styles.span}>{error}</span>
        </div>
      )}
    </>
  );
}
