import { Dispatch, SetStateAction, useEffect } from "react";
import GetCookieID from "../../cookie/getCookieId";
import styles from "../../../styles/index.module.css";
import FetchData from "./FetchData";

export default function PersonalPost({
  hasNewMessage,
  setHasNewMessage,
}: {
  hasNewMessage: boolean;
  setHasNewMessage: Dispatch<SetStateAction<boolean>>;
}) {
  const userID = GetCookieID();

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
            あなたのポストに新しいメッセージが届いています
          </p>
        </div>
      )}
    </>
  );
}
