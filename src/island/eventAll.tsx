import React, { useEffect, useState } from "react";
import LogSt from "../components/cookie/logSt";
import styles from "../styles/island/all.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../createClient";
import MenubarIsland from "../components/menubarIsland";

export default function EventAll() {
  LogSt();
  const navigate = useNavigate();
  const params = useParams();
  const paramsID = params.id;
  const [events, setEvents] = useState([]);
  const [islandName, setIslandName] = useState("");

  const currentDateTime = new Date(); // 現在の日時取得

  const createHandler = () => {
    navigate(`/event/create/${paramsID}`);
    window.location.reload();
  };

  // 島の名前を取得する関数
  const fetchIslandName = async () => {
    const { data, error } = await supabase
      .from("islands")
      .select("islandName")
      .eq("id", paramsID)
      .eq("status", false);

    if (error) {
      console.error("islandsテーブルデータ情報取得失敗", error);
      return;
    }

    if (data && data.length > 0) {
      setIslandName(data[0].islandName);
    }
  };

  useEffect(() => {
    const fetchEventData = async () => {
      const { data: userEntryStatusData, error } = await supabase
        .from("userEntryStatus")
        .select("*")
        .eq("islandID", paramsID)
        .eq("status", false);

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
          .eq("id", eventId)
          .eq("status", false);

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

    fetchIslandName();
    fetchEventData();
  }, [paramsID]);

  return (
    <div className={styles.flex2}>
      <MenubarIsland />
      <div className={styles.back}>
        <h2>{islandName}島 開催イベント</h2>
        <button onClick={createHandler} className={styles.button}>
          新しいイベントを始める
        </button>
        <div className={styles.eventAll}>
          {events
            .filter((event) => new Date(event.endDate) > currentDateTime)
            .map((event) => (
              <Link to={`/event/${event.id}`} className={styles.link}>
                <div key={event.id} className={styles.event2}>
                  <div className={styles.imgSide}>
                    <img
                      className={styles.icon}
                      src={
                        event.thumbnail ||
                        "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-08T07%3A12%3A33.854Z"
                      }
                      alt="Event Thumbnail"
                    ></img>
                    <div className={styles.eventInfo}>
                      <h2 className={styles.eventName}>{event.eventName}</h2>

                      <h3 className={styles.date}>
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
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
