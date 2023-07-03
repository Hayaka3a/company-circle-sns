import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/island/createIsland.module.css";
import { supabase } from "../../createClient";
import HandleNameBlur from "./handleNameBlur";
import HandleIslandNameChange from "./handleIslandNameChange";

export default function IslandName({
  islandName,
  setIslandName,
}: {
  islandName: string;
  setIslandName: Dispatch<SetStateAction<string>>;
}) {
  const [islandNameError, setIslandNameError] = useState("");
  const [nameAlreadyError, setNameAlreadyError] = useState("");

  const handleIslandNameChange = HandleIslandNameChange({
    islandNameError,
    setIslandName,
    setIslandNameError,
    setNameAlreadyError,
    nameAlreadyError,
  });

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
        onBlur={() => {
          HandleNameBlur({
            islandName,
            setIslandNameError,
            setNameAlreadyError,
          });
        }}
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
      <HandleNameBlur
        islandName={islandName}
        setIslandNameError={setIslandNameError}
        setNameAlreadyError={setNameAlreadyError}
      />
    </>
  );
}
