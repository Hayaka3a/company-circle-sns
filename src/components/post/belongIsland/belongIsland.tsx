import { useEffect, useState } from "react";
import GetCookieID from "../../cookie/getCookieId";
import styles from "../../../styles/index.module.css";
import FetchData from "./FetchData";

export default function BelongIsland() {
  const userID = GetCookieID();
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const newMessage = await FetchData(userID);
      setHasNewMessage(newMessage);
    }
    fetchData();
  }, [userID]);

  return (
    <>
      {hasNewMessage && (
        <div className={styles.flex}>
          <img
            src={"/images/light.png"}
            alt="event"
            className={styles.party}
          ></img>
          <p className={styles.p}>島ポストに新しいメッセージが届いています</p>
        </div>
      )}
    </>
  );
}
