// JSX表示のみコンポーネント

import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/island/createIsland.module.css";
import HandleNameBlur from "./handleNameBlur";
import HandleNameChange from "./handleNameChange";

export default function IslandName({
  islandName,
  setName,
}: {
  islandName: string;
  setName: Dispatch<SetStateAction<string>>;
}) {
  const [NameError, setNameError] = useState("");
  const [nameAlreadyError, setNameAlreadyError] = useState("");

  return (
    <>
      <input
        type="text"
        className={`${styles.islandName} ${NameError ? styles.errorInput : ""}`}
        maxLength={100}
        value={islandName}
        onChange={HandleNameChange({
          NameError,
          setName,
          setNameError,
          setNameAlreadyError,
          nameAlreadyError,
        })}
        onBlur={HandleNameBlur({
          Name: islandName,
          setNameError,
          setNameAlreadyError,
          type: "island",
        })}
      />
      <span className={styles.islandNameText}>&nbsp;島</span>
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
