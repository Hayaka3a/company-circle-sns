// JSX表示のみコンポーネント

import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/event/create.module.css";
import HandleDetailBlur from "../../createIsland/detail/handleBlur";
import HandleDetailChange from "../../createIsland/detail/handleDetailChange";

export default function InputDetail({
  detail,
  setDetail,
}: {
  detail: string;
  setDetail: Dispatch<SetStateAction<string>>;
}) {
  const [error, setError] = useState("");

  return (
    <>
      <textarea
        className={`${styles.detail} ${error ? styles.errorInput : ""} `}
        maxLength={250}
        value={detail}
        onChange={HandleDetailChange({ setDetail, error, setError })}
      />
      {error && (
        <div>
          <span className={styles.span}>{error}</span>
        </div>
      )}
      <HandleDetailBlur detail={detail} setError={setError} type={"event"} />
    </>
  );
}
