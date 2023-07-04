import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LogSt from "./components/cookie/logSt";
import styles from "./styles/index.module.css";
import { supabase } from "./createClient";
import PersonalPost from "./components/post/personalPost";
import BelongIsland from "./components/post/belongIsland";
import BelongEvent from "./components/post/belongEvent";
import { Link } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
reportWebVitals();

export default function Index() {
  LogSt();
  const [islands, setIslands] = useState([]);
  const [events, setEvents] = useState([]);
  const [tag, setTag] = useState("islands");
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // 島とイベント表示タブ切り替え
  const changeTagHandler = (selectedTag) => {
    setTag(selectedTag);
  };

  // 島データ取得
  const fetchIslands = async () => {
    try {
      const { data, error } = await supabase
        .from("islands")
        .select("*")
        .eq("status", false);

      if (error) {
        console.error("島情報取得失敗", error.message);
      } else {
        // データをランダムに並び替える
        const shuffledData = data.sort(() => Math.random() - 0.5);
        setIslands(shuffledData);
      }
    } catch (error) {
      console.error("島情報取得失敗", error.message);
      setIslands([]);
    }
  };

  // イベントデータ取得
  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", false)
      .order("createdAt", { ascending: false })
      .limit(6);

    if (error) {
      console.error("イベント情報取得失敗", error.message);
    } else {
      // createdAtフィールドで降順にソート
      const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
      setEvents(sortedData);
    }
  };

  useEffect(() => {
    fetchIslands();
    fetchEvents();
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
                <div className={styles.events}>
                  {events.slice(0, 6).map((event) => (
                    <div key={event.id} className={styles.event}>
                      <Link to={`/island/${event.id}`} className={styles.link}>
                        <img
                          className={styles.iconB}
                          src={
                            event.thumbnail ||
                            "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-08T07%3A12%3A33.854Z"
                          }
                          alt="Event Thumbnail"
                        />
                        <h3 className={styles.eventName}>{event.eventName}</h3>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
