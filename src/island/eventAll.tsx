import React, { useEffect, useState } from "react";
import LogSt from "../components/cookie/logSt";
import styles from "../styles/island/all.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../createClient";
import MenubarIsland from "../components/menubarIsland";

export default function EventAll() {
  LogSt();
  const navigate = useNavigate();
  const params = useParams();
  const [events, setEvents] = useState([]);
  const paramsID = params.id;

  const createHandler = () => {
    navigate("/event/create/[id]");
    window.location.reload();
  };

  useEffect(() => {
    const fetchEventData = async () => {
      const { data: userEntryStatusData, error } = await supabase
        .from("userEntryStatus")
        .select("*")
        .eq("islandID", paramsID);

      if (error) {
        console.error("userEntryStatusテーブル情報取得失敗");
        return;
      }

      const eventIds = userEntryStatusData
        .filter((entry) => entry.eventID !== null)
        .map((entry) => entry.eventID);

      const fetchEventDetails = async (eventId) => {
        const { data: eventData, error: eventError } = await supabase
          .from("events")
          .select("*")
          .eq("id", eventId);

        if (eventError) {
          console.error("Eventsテーブルデータ情報取得失敗", eventError);
        }
        return eventData[0];
      };
      const eventPromises = eventIds.map((eventId) =>
        fetchEventDetails(eventId),
      );
      const fetchedEvents = await Promise.all(eventPromises);

      setEvents(fetchedEvents.filter((event) => event !== null));
    };

    fetchEventData();
  }, [paramsID]);
  return (
    <div className={styles.flex}>
      <MenubarIsland thumbnail="/login/loginCounter.png" />
      <div className={styles.all}>
        <h2>○○島の掲示板</h2>
        <button onClick={createHandler} className={styles.button}>
          新しいイベントを始める
        </button>
        <div className={styles.eventAll}>
          {events.map((event) => (
            <div key={event.id} className={styles.event1}>
              <div className={styles.imgSide}>
                <img
                  className={styles.icon}
                  src={event.thumbnail || "/event_icon.png"}
                  alt="Event Thumbnail"
                ></img>
                <div className={styles.eventInfo}>
                  <h2 className={styles.eventName}>{event.eventName}</h2>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
