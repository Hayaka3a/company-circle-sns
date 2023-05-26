import { useState } from "react";
import styles from "../../styles/createIsland.module.css";

export default function Detail() {
  const [islandName, setIslandName] = useState("");
  const [islandNameError, setIslandNameError] = useState("");

  const handleIslandNameChange = (e) => {
    setIslandName(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (islandNameError) {
      setIslandNameError("");
    }
  };

  const handleIslandNameBlur = () => {
    if (islandName.trim() === "") {
      setIslandNameError("※活動内容は入力必須項目です");
    } else {
      setIslandNameError("");
    }
  };
  return (
    <>
      <input
        type="text"
        className={`${styles.inputA} ${
          islandNameError ? styles.errorInput : ""
        }`}
        maxLength={300}
        value={islandName}
        onChange={handleIslandNameChange}
        onBlur={handleIslandNameBlur}
      />
      {islandNameError && (
        <div>
          <span className={styles.span}>{islandNameError}</span>
        </div>
      )}
    </>
  );
}
