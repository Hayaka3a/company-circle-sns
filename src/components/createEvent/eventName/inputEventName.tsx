// JSX表示のみコンポーネント

import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/event/create.module.css";
import HandleNameBlur from "../../createIsland/islandName/handleNameBlur";
import HandleNameChange from "../../createIsland/islandName/handleNameChange";

export default function InputEventName({
  eventName,
  setName,
}: {
  eventName: string;
  setName: Dispatch<SetStateAction<string>>;
}) {
  const [NameError, setNameError] = useState("");
  const [nameAlreadyError, setNameAlreadyError] = useState("");

  return (
    <>
      <input
        type="text"
        className={`${styles.eventName} ${NameError ? styles.errorInput : ""}`}
        maxLength={100}
        value={eventName}
        onChange={HandleNameChange({
          NameError,
          setName,
          setNameError,
          setNameAlreadyError,
          nameAlreadyError,
        })}
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
        Name={eventName}
        setNameError={setNameError}
        setNameAlreadyError={setNameAlreadyError}
        type={"event"}
      />
    </>
  );
}
