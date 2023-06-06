import React, { useEffect, useState } from "react";
import styles from "../styles/menubar.module.css";
import { Link, useParams } from "react-router-dom";
import GetCookieID from "./cookie/getCookieId";
import { supabase } from "../createClient";

export default function MenubarEvent() {
  interface Event {
    eventName: string;
    thumbnail: string;
  }
  const [isJoined, setIsJoined] = useState(false); // イベントに参加しているかどうかの状態
  const [event, setEvent] = useState<Event | null>(null);
  const params = useParams();
  const paramsID = parseInt(params.id);

  const userID = GetCookieID();

  // 表示しているイベントの情報をeventに挿入
  const fetchIslandData = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("eventName, thumbnail")
      .eq("id", paramsID);

    if (error) {
      console.error("eventsテーブルデータ情報取得失敗", error);
      return;
    }

    if (data && data.length > 0) {
      setEvent(data[0]);
    }
  };

  // ユーザーが表示しているイベントに参加しているかどうかチェック
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("userEntryStatus")
      .select("*")
      .eq("userID", userID)
      .eq("eventID", paramsID)
      .eq("status", "false");
    if (error) {
      console.log(error);
      // ユーザーがイベントに参加してるとき
    } else if (data && data.length > 0) {
      setIsJoined(true);
    }
  };

  useEffect(() => {
    fetchData();
    fetchIslandData();
  }, []);

  return (
    <>
      <div className={styles.menubar}>
        {event && (
          <img
            className={styles.icon}
            src={event.thumbnail || "/event_icon.png"}
            alt="Event Thumbnail"
          />
        )}
        <h3 className={styles.title}>{event && event.eventName}</h3>
        {/* ユーザーがイベントに参加している場合 */}
        {isJoined && (
          <div className={styles.menuContents}>
            <div>
              <Link to={`/event/thread/${paramsID}`} className={styles.link}>
                掲示板
              </Link>
            </div>
            <div>
              <Link to={`/event/post/${paramsID}`} className={styles.link}>
                ポスト
              </Link>
            </div>
            <div>
              <Link to={`/event/members/${paramsID}`} className={styles.link}>
                参加者一覧
              </Link>
            </div>
            <div>
              <Link to={`/event/${paramsID}`} className={styles.link}>
                イベント詳細
              </Link>
            </div>
          </div>
        )}
        {/* ユーザーがイベントに参加してないとき */}
        {!isJoined && (
          <div className={styles.menuContents}>
            <div>
              <Link to={`/event/members`} className={styles.link}>
                参加者一覧
              </Link>
            </div>
            <div>
              <Link to={`/event/[id]`} className={styles.link}>
                イベント詳細
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
