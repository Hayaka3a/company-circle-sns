import { Link, useNavigate, useParams } from "react-router-dom";
import LogSt from "../components/cookie/logSt";
import styles from "../styles/island/all.module.css";
import { supabase } from "../createClient";

import { useEffect, useState } from "react";

export default function EventEverything() {
  LogSt();

  const params = useParams();
  const paramsID = params.id;

  const [events, setEvents] = useState([]);

  // イベントのデータを取得する関数
  const fetchEventsData = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "false");

    if (error) {
      console.error("eventsテーブルデータ情報取得失敗", error);
      return;
    }

    setEvents(data);
  };
  useEffect(() => {
    fetchEventsData();
  }, []);

  // 「詳細」100文字以降は...で表示する
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className={styles.flex}>
      <div className={styles.all}>
        <h2 className={styles.title}>イベント一覧</h2>
        <div className={styles.eventAll}>
          {events.map((event) => (
            <div key={event.id} className={styles.event1}>
              <div className={styles.imgSide}>
                <img
                  className={styles.icon}
                  src={event.thumbnail || "/event_icon.png"}
                  alt="event Thumbnail"
                ></img>
              </div>
              <div className={styles.eventInfo}>
                <Link to={`/event/${paramsID}`}>
                  <h2 className={styles.eventName}>{event.eventName}</h2>
                </Link>
                <p>{truncateString(event.detail, 100)}</p>
                <h3>
                  開催時期 ：
                  {new Date(event.startDate).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  ～{" "}
                  {new Date(event.endDate).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
