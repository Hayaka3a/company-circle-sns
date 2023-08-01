import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { default as LogSt } from "./components/cookie/logSt";
import styles from "./styles/index.module.css";
import PersonalPost from "./components/post/personalPost/personalPost";
import BelongIsland from "./components/post/belongIsland/belongIsland";
import BelongEvent from "./components/post/belongEvent/belongEvent";
import FetchIslands from "./components/index/fetchIslands";
import FetchEvents from "./components/index/fetchEvents";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
reportWebVitals();

export default function Index() {
  LogSt();

  const [tag, setTag] = useState("islands");
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // 島とイベント表示タブ切り替え
  const changeTagHandler = (selectedTag) => {
    setTag(selectedTag);
  };

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
              {tag === "islands" && <FetchIslands />}
              {tag === "events" && <FetchEvents />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
