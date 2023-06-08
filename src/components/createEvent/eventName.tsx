import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/event/create.module.css";
import { supabase } from "../../createClient";

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

  const handleNameBlur = async () => {
    if (eventName.trim() === "") {
      setNameError("※イベント名は入力必須項目です");
    } else {
      setNameError("");
      // クエリを実行してislandNameの重複チェック
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("eventName", eventName)
        .eq("status", false);
      if (error) {
        console.error("クエリエラー:", error.message);
      } else {
        if (data.length > 0) {
          setNameAlreadyError("※イベント名が既に存在します");
        }
      }
    }
  };
  return (
    <>
      <input
        type="text"
        className={`${styles.islandName} ${NameError ? styles.errorInput : ""}`}
        maxLength={100}
        value={eventName}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
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
    </>
  );
}
