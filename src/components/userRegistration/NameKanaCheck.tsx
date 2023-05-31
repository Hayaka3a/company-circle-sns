import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/newUser.module.css";

export default function NameKanaCheck({
  firstNameKana,
  setFirstNameKana,
  familyNameKana,
  setFamilyNameKana,
}: {
  firstNameKana: string;
  setFirstNameKana: Dispatch<SetStateAction<string>>;
  familyNameKana: string;
  setFamilyNameKana: Dispatch<SetStateAction<string>>;
}) {
  const [error, setError] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstNameKana(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (error) {
      setError("");
    }
  };
  const handleFamilyNameChange = (e) => {
    setFamilyNameKana(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (error) {
      setError("");
    }
  };

  const handleNameBlur = () => {
    if (familyNameKana.trim() === "" || firstNameKana.trim() === "") {
      setError("※入力必須項目です");
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
        value={firstNameKana}
        onChange={handleFirstNameChange}
        onBlur={handleNameBlur}
      />
      <input
        type="text"
        className={`${styles.inputB} ${error ? styles.errorInput : ""}`}
        maxLength={300}
        value={familyNameKana}
        onChange={handleFamilyNameChange}
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
