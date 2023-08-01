import React, { useEffect, useState } from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { default as LogSt } from "./components/cookie/logSt";
import styles from "./styles/index.module.css";
import PersonalPost from "./components/post/personalPost/personalPost";
import BelongIsland from "./components/post/belongIsland/belongIsland";
import BelongEvent from "./components/post/belongEvent/belongEvent";
import { Link } from "react-router-dom";
import { fetchIslands } from "./components/index/fetchIslands";
import { fetchEvents } from "./components/index/fetchEvents";
import { render } from "@testing-library/react";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
reportWebVitals();

export default function Index() {
  const [islands, setIslands] = useState([]);
  const [events, setEvents] = useState([]);
  const [tag, setTag] = useState("islands");
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // 島とイベント表示タブ切り替え
  const changeTagHandler = (selectedTag) => {
    setTag(selectedTag);
  };

  useEffect(() => {
    // LogSt();
    fetchIslands(setIslands);
    fetchEvents(setEvents);
  }, []);

  return (
    <>
      <div className={styles.all}>
        {/* ロゴ */}

        <div className={styles.displayAll}>
          <img src="/images/logo.png" className={styles.logo} />

          <div className={styles.information}>
            <h3 className={styles.news}>お知らせ</h3>
            {/* 個人用ポスト */}
            <PersonalPost
              hasNewMessage={hasNewMessage}
              setHasNewMessage={setHasNewMessage}
            />
            {/* 参加サークルポスト */}
            <BelongIsland />
            {/* 参加イベントポスト */}
            <BelongEvent />
          </div>
          <div className={styles.main}>
            <div className={styles.tabs}>
              <button
                className={`${tag === "islands" ? styles.active : ""} ${
                  styles.buttonA
                }`}
                onClick={() => changeTagHandler("islands")}
              >
                おすすめ島
              </button>
              <button
                className={`${tag === "events" ? styles.active : ""} ${
                  styles.buttonB
                }`}
                onClick={() => changeTagHandler("events")}
                name="新着イベント"
                data-testid="newEvent"
              >
                新着イベント
              </button>
            </div>
            <div className={styles.down}>
              {tag === "islands" && (
                <div className={styles.islands}>
                  {islands.slice(0, 6).map((island) => (
                    <div key={island.id} className={styles.island}>
                      <Link to={`/island/${island.id}`} className={styles.link}>
                        <img
                          className={styles.icon}
                          src={
                            island.thumbnail ||
                            "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-08T07%3A12%3A33.854Z"
                          }
                          alt="Event Thumbnail"
                        />
                        <h3 className={styles.islandName}>
                          {island.islandName}
                        </h3>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              {tag === "events" && (
                <div>
                  <div className={styles.events}>
                    {events.slice(0, 6).map((event) => (
                      <div key={event.id} className={styles.event}>
                        <Link
                          to={`/island/${event.id}`}
                          className={styles.link}
                          data-testid="eventLink"
                        >
                          <img
                            className={styles.iconB}
                            src={
                              event.thumbnail ||
                              "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-08T07%3A12%3A33.854Z"
                            }
                            alt="Event Thumbnail"
                          />
                          <h3 className={styles.eventName}>
                            {event.eventName}
                          </h3>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
