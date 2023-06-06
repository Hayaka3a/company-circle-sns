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
    try {
      //　ユーザーが参加している島からイベントを取得
      const { data: entrys, error: entrysError } = await supabase
        .from("userEntryStatus")
        .select("islandID")
        .eq("userID", userID);

      // entrys配列の中からeventIDがnullの値のものを配列から取り除く
      const ens = entrys.filter((event) => event.islandID !== null);

      if (entrysError) {
        console.error("データ1取得失敗", entrysError.message);
        return;
      }

      try {
        const filteredEvents = await Promise.all(
          ens.map(async (en) => {
            const { data: events, error: eventsError } = await supabase
              .from("userEntryStatus")
              .select("eventID")
              .eq("islandID", en.islandID);

            if (eventsError) {
              console.error("データ1取得失敗", eventsError.message);
              return;
            }

            // events配列の中からeventIDがnullの値のものを配列から取り除く
            const filteredEvents = events.filter(
              (event) => event.eventID !== null,
            );

            return filteredEvents;
          }),
        );

        // 配列の配列になっているのをフラット化する（ただの配列に直す）
        const flattenedEvents = filteredEvents.flat();

        // 同じeventIDを持つデータを1つにまとめる
        const uniqueEvents = flattenedEvents.reduce((acc, event) => {
          if (!acc.some((e) => e.eventID === event.eventID)) {
            acc.push(event);
          }
          return acc;
        }, []);

        // イベントを開催している島に不参加の場合のデータを追加
        const { data: refugee, error: refugeeError } = await supabase
          .from("userEntryStatus")
          .select("eventID")
          .eq("userID", userID);

        if (refugeeError) {
          console.error("データ取得失敗", refugeeError.message);
          return;
        }
        const uniqueEventsFiltered = refugee.filter(
          (evt) => evt.eventID !== null,
        );

        uniqueEvents.push(...uniqueEventsFiltered);
        // ユーザーもしくは参加している島がイベント参加している場合
        // uniqueEvents配列内のeventIDとparamsIDを比較して、一致する場合にisJoinedを設定
        const isJoinedEvent = uniqueEvents.some(
          (event) => event.eventID === paramsID,
        );
        if (isJoinedEvent) {
          setIsJoined(true);
        }
      } catch (error) {
        console.error("データ取得2失敗");
      }
    } catch (error) {
      console.error("データ取得1失敗");
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
