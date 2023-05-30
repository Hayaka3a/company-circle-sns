import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/createIsland.module.css";
import { supabase } from "../../createClient";

export default function IslandName({
  islandName,
  setIslandName,
}: {
  islandName: string;
  setIslandName: Dispatch<SetStateAction<string>>;
}) {
  const [islandNameError, setIslandNameError] = useState("");
  const [nameAlreadyError, setNameAlreadyError] = useState("");

  const handleIslandNameChange = (e) => {
    setIslandName(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (islandNameError) {
      setIslandNameError("");
    }
    // 重複エラーも非表示にする
    if (nameAlreadyError) {
      setNameAlreadyError("");
    }
  };

  const handleIslandNameBlur = async () => {
    if (islandName.trim() === "") {
      setIslandNameError("※島名は入力必須項目です");
    } else {
      setIslandNameError("");
      // クエリを実行してislandNameの重複チェック
      const { data, error } = await supabase
        .from("islands")
        .select("*")
        .eq("islandName", islandName);
      if (error) {
        console.error("クエリエラー:", error.message);
      } else {
        if (data.length > 0) {
          setNameAlreadyError("※島名が既に存在します");
        }
      }
    }
  };
  return (
    <>
      <input
        type="text"
        className={`${styles.islandName} ${
          islandNameError ? styles.errorInput : ""
        }`}
        maxLength={100}
        value={islandName}
        onChange={handleIslandNameChange}
        onBlur={handleIslandNameBlur}
      />
      <span className={styles.islandNameText}>&nbsp;島</span>
      {islandNameError && (
        <div>
          <span className={styles.span}>{islandNameError}</span>
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
