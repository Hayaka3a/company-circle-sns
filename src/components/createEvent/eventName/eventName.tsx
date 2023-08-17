// JSX表示のみコンポーネント

import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/event/create.module.css";
import HandleNameBlur from "../../createIsland/islandName/handleNameBlur";
import HandleNameChange from "../../createIsland/islandName/handleNameChange";

export default function EventName({
  eventName,
  setName,
  setNameAlreadyError,
  nameAlreadyError,
}: {
  eventName: string;
  setName: Dispatch<SetStateAction<string>>;
  setNameAlreadyError: Dispatch<SetStateAction<string>>;
  nameAlreadyError: string;
}) {
  const [NameError, setNameError] = useState("");

  return (
    <>
      <input
        type="text"
        className={`${styles.eventName} ${
          NameError || nameAlreadyError ? styles.errorInput : ""
        }`}
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
