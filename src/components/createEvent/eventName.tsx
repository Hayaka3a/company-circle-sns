import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/event/create.module.css";
import { supabase } from "../../createClient";
import HandleNameBlur from "./handleNameBlur";

export default function EventName({
  eventName,
  setEventName,
}: {
  eventName: string;
  setEventName: Dispatch<SetStateAction<string>>;
}) {
  const [NameError, setNameError] = useState("");
  const [nameAlreadyError, setNameAlreadyError] = useState("");

  const handleNameChange = (e) => {
    setEventName(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (NameError) {
      setNameError("");
    }
    // 重複エラーも非表示にする
    if (nameAlreadyError) {
      setNameAlreadyError("");
    }
  };

  return (
    <>
      <input
        type="text"
        className={`${styles.eventName} ${NameError ? styles.errorInput : ""}`}
        maxLength={100}
        value={eventName}
        onChange={handleNameChange}
        onBlur={() => {
          HandleNameBlur({
            eventName,
            setNameError,
            setNameAlreadyError,
          });
        }}
      />
      <span className={styles.islandNameText}></span>
      {NameError && (
        <div>
          <span className={styles.span}>{NameError}</span>
        </div>
      )}
      {nameAlreadyError && (
        <div>
          <span className={styles.span}>{nameAlreadyError}</span>
        </div>
      )}
      <HandleNameBlur
        eventName={eventName}
        setNameError={setNameError}
        setNameAlreadyError={setNameAlreadyError}
      />
    </>
  );
}
