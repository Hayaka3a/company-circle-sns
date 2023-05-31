import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/newUser.module.css";

export default function NameCheck({
  firstName,
  setFirstName,
  familyName,
  setFamilyName,
}: {
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  familyName: string;
  setFamilyName: Dispatch<SetStateAction<string>>;
}) {
  const [error, setError] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (error) {
      setError("");
    }
  };
  const handleFamilyNameChange = (e) => {
    setFamilyName(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (error) {
      setError("");
    }
  };

  const handleNameBlur = () => {
    if (familyName.trim() === "" || firstName.trim() === "") {
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
        value={firstName}
        onChange={handleFirstNameChange}
        onBlur={handleNameBlur}
      />
      <input
        type="text"
        className={`${styles.inputB} ${error ? styles.errorInput : ""}`}
        maxLength={300}
        value={familyName}
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
