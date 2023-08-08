import { useEffect, useState } from "react";
import MenubarEvent from "../components/menubar/menubarEvent";
import styles from "../styles/island/islandDetail.module.css";
import CreateSendingMessage from "../components/modalWindows/createSendingMessage";
import CreateResidentApplication from "../components/modalWindows/createResidentApplication";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../createClient";
import LogSt from "../components/cookie/logSt";
import { Event } from "../types/members";
import EventSendingMessage from "../components/modalWindows/eventSendingMessage";
import GetCookieID from "../components/cookie/getCookieId";
import FetchEventDetail from "../components/fetchEventDetail";
import FetchIsland from "../components/fetchIsland_id";
import FetchEventPosts from "../components/fetchEventPosts";

export default function EventDetail() {
  LogSt();
  const [isOpen, setIsOpen] = useState(false);
  const [alreadyError, setAlreadyError] = useState("");
  const [isResidentOpen, setIsResidentOpen] = useState(false);
  const navigate = useNavigate();
  const eventId = useParams();
  const userId = GetCookieID();
  const [button, setButton] = useState(true);
  const [eventDetail, setEventDetail] = useState<Event>(null); // 取得した島の詳細情報を保持する状態変数
  const [eventImage, setEventImage] = useState(
    "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-05T07%3A40%3A07.886Z",
  );

  const [islandArray, setIslandArray] = useState([]);

  useEffect(() => {
    fetchEventDetailData(); 
    fetchIslandData(eventId);
    fetchEventPostData();
  }, [eventId, userId]);


  const fetchEventDetailData = async () => {
    await FetchEventDetail(eventId, userId, setButton, setEventDetail, setEventImage);
  };

  const fetchIslandData = async (eventId) => {
    const islands = await FetchIsland(eventId);
    setIslandArray(islands || []);
  };

  // すでに住民申請を送っているか確認確認
  const fetchEventPostData = async () => {
    await FetchEventPosts(userId, eventId, setAlreadyError);
  };

  // 住民申請を押した際の小窓画面（モーダルウィンドウ）の開閉
  // isResidentOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する
  const openResindentModal = () => {
    setIsResidentOpen(true);
  };
  const closeResidentModal = () => {
    setIsResidentOpen(false);
    window.location.reload();
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
    navigate(`/event/edit/${eventId.id}`);
    window.location.reload();
  };
  return (
    <div className={styles.flex}>
      <MenubarEvent />
      <div className={styles.back}>
        <div className={styles.detail}>
          {eventDetail && (
            <img src={eventImage} alt="アイコン" className={styles.icon} />
          )}
          <h2>{eventDetail && eventDetail.eventName}</h2>

          <table className={styles.table}>
            <tbody className={styles.tbody}>
              <tr className={styles.tr}>
                <th className={styles.th}>開催日時</th>
                <td className={styles.td}>
                  {eventDetail &&
                    new Date(eventDetail.startDate).toLocaleDateString(
                      "ja-JP",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  ~
                  {eventDetail &&
                    new Date(eventDetail.endDate).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </td>
              </tr>
              <tr>
                <th className={styles.th}>イベント詳細</th>
                <td className={styles.td}>
                  <p className={styles.textDetail}>
                    {eventDetail && eventDetail.detail}
                  </p>
                </td>
              </tr>
              <tr>
                <th className={styles.th}>参加島</th>
                <td className={styles.td}>
                  {islandArray.map((data) => {
                    return (
                      <div key={data.islands.id}>
                        <Link
                          to={`/island/${data.islands.id}`}
                          key={data.islands.id}
                        >
                          {data.islands.islandName}
                        </Link>
                      </div>
                    );
                  })}
                </td>
              </tr>
            </tbody>
          </table>

          <div>
            {alreadyError && (
              <div>
                <span className={styles.span}>{alreadyError}</span>
              </div>
            )}

            <button
              onClick={openResindentModal}
              // 条件式 ? 真の場合の値 : 偽の場合の値
              className={`${styles.btn1} ${
                alreadyError || button ? styles.disabled : ""
              }`}
              disabled={alreadyError ? true : false || button}
            >
              住民申請
            </button>

            {isResidentOpen && (
              <CreateResidentApplication
                closeModal={closeResidentModal}
                table="event"
              />
            )}
            <button onClick={openModal} className={styles.btn2}>
              メッセージを送る
            </button>
            {isOpen && (
              <EventSendingMessage closeModal={closeModal} table="event" />
            )}
          </div>
          {button && (
            <div className={styles.editbox}>
              <button id={styles.edit_btn} onClick={Handler}>
                編集・削除
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
