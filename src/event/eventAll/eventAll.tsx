import { Link, useNavigate, useParams } from "react-router-dom";
import LogSt from "../../components/cookie/logSt";
import styles from "../../styles/island/all.module.css";
import { supabase } from "../../createClient";

import { useEffect, useState } from "react";
import TruncateString from "../../island/islandAll/truncateString";
import FetchEventsData from "./fetchEventsData";

export default function EventEverything() {
  LogSt();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // イベントのデータを取得する関数
    FetchEventsData(events, setEvents);
  }, []);

  return (
    <>
      <img src={"/event/sankaku.png"} alt="event" className={styles.flag}></img>
      <div className={styles.flex}>
        <div className={styles.all}>
          <div className={styles.side}>
            <h2 className={styles.title}>イベント一覧</h2>
            <img
              src={"/event/party.png"}
              alt="event"
              className={styles.party}
            ></img>
          </div>
          <div className={styles.eventAll}>
            {events.map((event) => (
              <Link
                to={`/event/${event.id}`}
                className={styles.link}
                key={event.id}
              >
                <div key={event.id} className={styles.event1}>
                  <div className={styles.imgSide}>
                    <img
                      className={styles.icon1}
                      src={event.thumbnail || "/event/event_icon.png"}
                      alt="event Thumbnail"
                    ></img>
                  </div>
                  <div className={styles.eventInfo}>
                    <h3 className={styles.eventName}>{event.eventName}</h3>
                    <p>
                      <TruncateString str={event.detail} maxLength={100} />
                    </p>
                    <p>
                      開催期間 ：
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
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
