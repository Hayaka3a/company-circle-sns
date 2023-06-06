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
        .eq("status", "false");

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
      .eq("status", "false")
      .limit(6);

    if (error) {
      console.error("イベント情報取得失敗", error.message);
    } else {
      const shuffledData = data.sort(() => Math.random() - 0.5);
      setEvents(shuffledData);
    }
  };

  useEffect(() => {
    fetchIslands();
    fetchEvents();
  }, []);

  return (
    <div className={styles.all}>
      <h1>あつまれ ラクスの森</h1>
      <div className={styles.information}>
        <h2>あなたへお知らせ</h2>
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
        <h2>ラクスの森情報</h2>
        <div className={styles.tabs}>
          <button
            className={`${tag === "islands" ? styles.active : ""} ${
              styles.buttonA
            }`}
            onClick={() => changeTagHandler("islands")}
          >
            島
          </button>
          <button
            className={`${tag === "events" ? styles.active : ""} ${
              styles.buttonB
            }`}
            onClick={() => changeTagHandler("events")}
          >
            イベント
          </button>
        </div>
        {tag === "islands" && (
          <div className={styles.islands}>
            {islands.slice(0, 6).map((island) => (
              <div key={island.id} className={styles.island}>
                <img
                  className={styles.icon}
                  src={island.thumbnail || "/island/island_icon.png"}
                  alt="Event Thumbnail"
                />
                <h2>{island.islandName}</h2>
              </div>
            ))}
          </div>
        )}

        {tag === "events" && (
          <div className={styles.events}>
            {events.slice(0, 6).map((event) => (
              <div key={event.id} className={styles.event}>
                <img
                  className={styles.icon}
                  src={event.thumbnail || "/event_icon.png"}
                  alt="Event Thumbnail"
                />
                <h2>{event.eventName}</h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
