import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/event/create.module.css";
import HandleBlur from "./handleBlur";
import HandleChange from "./handleChange";

export default function Daytime({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: {
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
}) {
  const [error, setError] = useState("");

  return (
    <>
      <input
        type="date"
        className={`${styles.date} ${error ? styles.errorInput : ""}`}
        maxLength={300}
        value={startDate}
        id="startDate"
        onChange={HandleChange({
          setStartDate,
          setEndDate,
          error,
          setError,
          type: "start",
        })}
      />
      &nbsp; ～ &nbsp;
      <input
        type="date"
        className={`${styles.date} ${error ? styles.errorInput : ""}`}
        maxLength={300}
        value={endDate}
        id="endDate"
        onChange={HandleChange({
          setStartDate,
          setEndDate,
          error,
          setError,
          type: "end",
        })}
      />
      {error && (
        <div>
          <span className={styles.span}>{error}</span>
        </div>
      )}
      <HandleBlur startDate={startDate} endDate={endDate} setError={setError} />
    </>
  );
}
