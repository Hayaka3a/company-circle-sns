// JSX表示のみコンポーネント

import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/island/createIsland.module.css";
import { supabase } from "../../../createClient";
import HandleNameBlur from "./handleNameBlur";
import HandleIslandNameChange from "./handleIslandNameChange";

export default function NameInput({
  islandName,
  setIslandName,
}: {
  islandName: string;
  setIslandName: Dispatch<SetStateAction<string>>;
}) {
  const [islandNameError, setIslandNameError] = useState("");
  const [nameAlreadyError, setNameAlreadyError] = useState("");

  return (
    <>
      <input
        type="text"
        className={`${styles.islandName} ${
          islandNameError ? styles.errorInput : ""
        }`}
        maxLength={100}
        value={islandName}
        onChange={HandleIslandNameChange({
          islandNameError,
          setIslandName,
          setIslandNameError,
          setNameAlreadyError,
          nameAlreadyError,
        })}
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
      {/* onBlur実行 */}
      <HandleNameBlur
        islandName={islandName}
        setIslandNameError={setIslandNameError}
        setNameAlreadyError={setNameAlreadyError}
      />
    </>
  );
}
