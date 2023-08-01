import { useEffect, useState } from "react";
import GetCookieID from "../../cookie/getCookieId";
import styles from "../../../styles/index.module.css";
import FetchData from "./FetchData";

export default function BelongEvent() {
  const userID = GetCookieID();
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    FetchData(userID, setHasNewMessage);
  }, [userID, setHasNewMessage]);

  return (
    <>
      {hasNewMessage && (
        <div className={styles.flex}>
          <img
            src={"/images/light.png"}
            alt="event"
            className={styles.party}
          ></img>
          <p className={styles.p}>
            イベントポストに新しいメッセージが届いています
          </p>
        </div>
      )}
    </>
  );
}
