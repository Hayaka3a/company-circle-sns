// JSX表示のみコンポーネント

import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/event/create.module.css";
import HandleNameBlur from "./handleNameBlur";
import HandleNameChange from "./handleNameChange";

export default function InputEventName({
  eventName,
  setEventName,
}: {
  eventName: string;
  setEventName: Dispatch<SetStateAction<string>>;
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
          setEventName,
          NameError,
          setNameError,
          nameAlreadyError,
          setNameAlreadyError,
        })}
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
