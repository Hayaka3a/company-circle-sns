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
import { Link, useParams } from "react-router-dom";

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
  const params = useParams();
  const paramsID = Number(params.id);
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
    <div>
      <div className={styles.all}>
        {/* ロゴ */}
        <Link to={"/"}>
          <img src="/images/logo.png" className={styles.logo} />
        </Link>
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
          <h2>ラクスの森情報</h2>
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
          {tag === "islands" && (
            <div className={styles.islands}>
              {islands.map((island) => (
                <div key={island.id} className={styles.island}>
                  <Link to={`/island/${island.id}`}>
                    <img
                      className={styles.icon}
                      src={island.thumbnail || "/island/island_icon.png"}
                      alt="Event Thumbnail"
                    />
                    <h2>{island.islandName}</h2>
                  </Link>
                </div>
              ))}
              <Link to={`/island/islandAll`}>島一覧情報</Link>はこちら！
            </div>
          )}
          {tag === "events" && (
            <div className={styles.events}>
              {events.slice(0, 6).map((event) => (
                <div key={event.id} className={styles.event}>
                  <Link to={`/island/${event.id}`}>
                    <img
                      className={styles.icon}
                      src={event.thumbnail || "/event_icon.png"}
                      alt="Event Thumbnail"
                    />
                    <h2>{event.eventName}</h2>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
