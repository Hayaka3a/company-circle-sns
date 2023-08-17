// JSX表示のみコンポーネント

import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/island/createIsland.module.css";
import HandleNameBlur from "./handleNameBlur";
import HandleNameChange from "./handleNameChange";

export default function IslandName({
  islandName,
  setName,
  setNameAlreadyError,
  nameAlreadyError,
}: {
  islandName: string;
  setName: Dispatch<SetStateAction<string>>;
  setNameAlreadyError: Dispatch<SetStateAction<string>>;
  nameAlreadyError: string;
}) {
  const [NameError, setNameError] = useState("");

  return (
    <>
      <input
        type="text"
        className={`${styles.islandName} ${
          NameError || nameAlreadyError ? styles.errorInput : ""
        }`}
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
