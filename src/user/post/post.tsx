import { useEffect, useState } from "react";
import styles from "../../styles/island/island_post.module.css";
import GetCookieID from "../../components/cookie/getCookieId";
import { format } from "date-fns";
import classNames from "classnames";
import LogSt from "../../components/cookie/logSt";
import FetchMsg from "./fetchMsg";
import { readHandler } from "../../components/post/readHandler";
import { useNavigate } from "react-router-dom";

export default function UserPost() {
  LogSt();

  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const userID = GetCookieID();

  useEffect(() => {
    //メッセージ受信
    FetchMsg(userID, setMessages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.all}>
        <div className={styles.islandPostBack}>
          <h2>POST</h2>
          <div className={styles.postMessageBack}>
            <h2>受信メッセージ✉️</h2>

            {messages.length === 0 ? (
              <p>受信メッセージはありません</p>
            ) : (
              messages.map((message) => (
                <div
                  className={styles.message}
                  key={message.id}
                  data-testid="message"
                >
                  <div className={styles.flex}>
                    <img
                      className={styles.icon}
                      src={
                        (message.by.events && message.by.events.thumbnail) ||
                        (message.by.islands && message.by.islands.thumbnail) ||
                        "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-08T07%3A12%3A33.854Z"
                      }
                      alt=" Thumbnail"
                    ></img>
                    <div className={styles.right}>
                      <div className={styles.upper}>
                        <div
                          className={classNames(styles.username, {
                            [styles.unreadName]: !message.isRead,
                          })}
                        >
                          {message.isRead === false && (
                            <div className={styles.unreadCircle}>未読</div>
                          )}
                          {(message.by.islands &&
                            message.by.islands.islandName) ||
                            (message.by.events && message.by.events.eventName)}
                        </div>
                        <p className={styles.date}>
                          {format(
                            new Date(message.sendingDate),
                            "yyyy年MM月dd日",
                          )}
                        </p>
                      </div>
                      <p
                        className={classNames(styles.mss, {
                          [styles.unread]: !message.isRead,
                        })}
                      >
                        {message.message.substring(0, 80)}...
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => readHandler(message.id, navigate)}
                    className={styles.displayButton}
                  >
                    表示
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
