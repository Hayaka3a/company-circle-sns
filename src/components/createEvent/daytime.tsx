import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/event/create.module.css";

export default function Daytime({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: {
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
}) {
  const [error, setError] = useState("");

  const handleStartChange = (e) => {
    setStartDate(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (error) {
      setError("");
    }
  };

  const handleEndChange = (e) => {
    setEndDate(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (error) {
      setError("");
    }
  };

  const handleBlur = () => {
    if (startDate.trim() === "" || endDate.trim() === "") {
      setError("※開催時期は開始日時と終了日時の両方入力必須項目です");
    } else {
      setError("");
    }
  };
  return (
    <>
      <input
        type="date"
        className={`${styles.date} ${error ? styles.errorInput : ""}`}
        maxLength={300}
        value={startDate}
        onChange={handleStartChange}
        onBlur={handleBlur}
      />
      &nbsp; ～ &nbsp;
      <input
        type="date"
        className={`${styles.date} ${error ? styles.errorInput : ""}`}
        maxLength={300}
        value={endDate}
        onChange={handleEndChange}
        onBlur={handleBlur}
      />
      {error && (
        <div>
          <span className={styles.span}>{error}</span>
        </div>
      )}
    </>
  );
}
