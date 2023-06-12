import React, { useEffect, useState } from "react";
import MenubarEvent from "../components/menubarEvent";
import styles from "../styles/island/islandDetail.module.css";
import LogSt from "../components/cookie/logSt";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../createClient";
import EventSendingMessage from "../components/modalWindows/eventSendingMessage";
import { format } from "date-fns";
import CreateResidentApplication from "../components/modalWindows/createResidentApplication";

export default function EventDetail() {
  LogSt();
  const eventID = useParams();
  const eventIDValue = eventID["id"];

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState(null); // 取得したイベントの詳細情報を保持する状態変数
  const [islandNames, setIslandNames] = useState([]); // 島名を保持する状態変数
  const [entryAOpen, setEntryAOpen] = useState(false);

  const startDate = eventDetail
    ? format(new Date(eventDetail.startDate), "yyyy年MM月dd日")
    : "";
  const endDate = eventDetail
    ? format(new Date(eventDetail.endDate), "yyyy年MM月dd日")
    : "";

  // console.log(eventDetail)

  useEffect(() => {
    fetchEventDetail();
    entryIsland();
  }, [eventID]);

  // イベント情報を取得

  const fetchEventDetail = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventIDValue); // イベントのIDに応じてフィルタリングする（eventID.idは該当する島のID）

    if (error) {
      console.log("イベントの詳細情報の取得に失敗しました", error);
      return;
    }
    if (data.length === 0) {
      console.log("該当するイベントの詳細情報が見つかりませんでした");
      return;
    }

    const eventDetail = data[0]; // 最初のデータを取得（仮定）
    // console.log("イベントの詳細情報:", eventDetail);

    setEventDetail(eventDetail); // イベントの詳細情報を状態変数にセット
  };

  // 参加サークル情報を取得
  const entryIsland = async () => {
    const { data, error } = await supabase
      .from("userEntryStatus")
      .select("islandID")
      .eq("eventID", eventIDValue);

    if (error) {
      console.log("イベントの詳細情報の取得に失敗しました", error);
      return;
    }
    if (data.length === 0) {
      console.log("該当するイベントの詳細情報が見つかりませんでした");
      return;
    }

    const islandIDs = data.map((entry) => entry.islandID); // フィルタリングされたデータの島IDを抽出

    // 島名、thumbnailを取得
    const { data: islandData, error: islandError } = await supabase
      .from("islands")
      .select("*")
      .in("id", islandIDs);

    if (islandError) {
      console.log("島名の取得に失敗しました", islandError);
      return;
    }

    const islandNames = islandData.map((island) => island.islandName);
    setIslandNames(islandNames); // 島名をセット

    // console.log("島名:", islandNames);
  };

  // イベント参加申請を押した際の小窓画面（モーダルウィンドウ）の開閉
  // の値がtrueの時だけ小窓画面をレンダリング（表示）する
  const openEntryModal = () => {
    setEntryAOpen(true);
  };

  const closeEntryModal = () => {
    setEntryAOpen(false);
  };

  // メッセージを送るを押した際の小窓画面（モーダルウィンドウ）の開閉
  // isOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const Handler = () => {
    navigate(`/event/edit/${eventID.id}`);
    window.location.reload();
  };

  return (
    <div className={styles.flex}>
      <MenubarEvent />
      <div className={styles.back}>
        <div className={styles.event_detail}>
          <h1>{eventDetail && eventDetail.eventName}</h1>
          {eventDetail && (
            <img
              src={eventDetail.thumbnail || "/event_icon.png"}
              className={styles.eventIcon}
            />
          )}
          <div>
            <label className={styles.detail}>開催日時</label>
            <p className={styles.center}>
              {eventDetail && eventDetail.startDate && eventDetail.endDate && (
                <>
                  {startDate} ~{endDate}
                </>
              )}
            </p>
          </div>

          <div>
            <label className={styles.detail}>イベント詳細</label>
            <div>
              <p className={styles.center}>
                {eventDetail && eventDetail.detail}
              </p>
            </div>
          </div>

          <div>
            <label className={styles.detail}>参加島(サークル)</label>
            {islandNames.map((name, index) => (
              <p key={index} className={styles.center}>
                {name}
              </p>
            ))}
          </div>

          <div className={styles.btn}>
            <button onClick={openEntryModal}>参加申請</button>
            {entryAOpen && (
              <CreateResidentApplication
                closeModal={closeModal}
                table="event"
              />
            )}
            <button onClick={openModal}>メッセージを送る</button>
            {isOpen && (
              <EventSendingMessage closeModal={closeModal} table="events" />
            )}
          </div>
          <button id={styles.edit_btn} onClick={Handler}>
            編集・削除
          </button>
        </div>
      </div>
    </div>
  );
}
