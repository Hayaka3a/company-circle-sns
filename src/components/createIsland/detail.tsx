import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/island/createIsland.module.css";

export default function Detail({
  detail,
  setDetail,
}: {
  detail: string;
  setDetail: Dispatch<SetStateAction<string>>;
}) {
  const [error, setError] = useState("");

  const handleIslandDetailChange = (e) => {
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
      <textarea
        className={`${styles.detail} ${error ? styles.errorInput : ""} `}
        maxLength={250}
        value={detail}
        onChange={handleIslandDetailChange}
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
