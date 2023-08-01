// イベントデータ取得

import React, { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import { Link } from "react-router-dom";
import styles from "../../styles/index.module.css";

export default function FetchEvents() {
  const [events, setEvents] = useState([]);

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
    fetchEvents();
  }, []);

  return (
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
  );
}
