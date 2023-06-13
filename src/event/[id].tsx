import { useEffect, useState } from "react";
import MenubarEvent from "../components/menubarEvent";
import styles from "../styles/island/islandDetail.module.css";
import CreateSendingMessage from "../components/modalWindows/createSendingMessage";
import CreateResidentApplication from "../components/modalWindows/createResidentApplication";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../createClient";
import LogSt from "../components/cookie/logSt";
import { Event } from "../types/members";
import EventSendingMessage from "../components/modalWindows/eventSendingMessage";
import GetCookieID from "../components/cookie/getCookieId";

export default function EventDetail() {
  LogSt();
  const [isOpen, setIsOpen] = useState(false);
  const [alreadyError, setAlreadyError] = useState("");
  const [isResidentOpen, setIsResidentOpen] = useState(false);
  const navigate = useNavigate();
  const eventId = useParams();
  const userId = GetCookieID();
  const [eventDetail, setEventDetail] = useState<Event>(null); // 取得した島の詳細情報を保持する状態変数
  const [eventImage, setEventImage] = useState(
    "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-05T07%3A40%3A07.886Z",
  );

  const [islandArray, setIslandArray] = useState([]);

  useEffect(() => {
    fetchEventDetail();
    fetchIsland();
    fetchEventPost();
  }, []);

  const fetchEventDetail = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId.id) // 島のIDに応じてフィルタリングする（eventId.idは該当する島のID）
      .eq("status", false);
    if (error) {
      console.error("fetchEventDetail:", error);
      return;
    }
    if (data.length === 0) {
      console.warn("該当する島の詳細情報が見つかりませんでした。");
      return;
    }

    const eventDetail = data[0] as undefined; // 最初のデータを取得（仮定）
    const tmpEve = eventDetail as Event;
    setEventDetail(eventDetail); // 島の詳細情報を状態変数にセット
    if (tmpEve.thumbnail) {
      setEventImage(tmpEve.thumbnail);
    }
  };

  const fetchIsland = async () => {
    const { data, error } = await supabase
      .from("userEntryStatus")
      .select("*,islands(*)")
      .eq("eventID", eventId.id) // 島のIDに応じてフィルタリングする（eventId.idは該当する島のID）
      .eq("status", false);
    if (error) {
      console.error("fetchIsland:", error);
      return;
    }
    if (data.length === 0) {
      console.warn("該当する島の詳細情報が見つかりませんでした。");
      return;
    } else {
      const island = data.filter((data) => data.islandID);
      setIslandArray(island);
    }
  };

  // すでに住民申請を送っているか確認確認
  const fetchEventPost = async () => {
    // ユーザーのポスト番号取得
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("userID", userId)
      .eq("status", false);

    if (error) {
      console.log("ユーザーポスト番号取得失敗");
    }
    // ユーザーが送信したメッセージ取得
    const { data: message, error: messageError } = await supabase
      .from("messages")
      .select("*")
      .eq("postedBy", data[0].id);

    const appMsg = message.filter((msg) => msg.message === "参加申請");

    // イベントポスト番号取得
    if (appMsg.length > 0) {
      const { data: event, error: eventError } = await supabase
        .from("posts")
        .select("*")
        .eq("eventID", Number(eventId.id));

      if (eventError) {
        console.log("島ポスト番号取得失敗");
      }

      // 島ポスト番号が送信済みの参加申請のpostIDと同じだった場合に「住民申請」ボタンをグレーアウトし、「すでに申請済みです」のエラーを表示させる
      if (appMsg[0].postID === event[0].id) {
        setAlreadyError("すでに住民許可申請を送っています");
      }
    }
    if (messageError) {
      console.log("ユーザー送信メッセージ一覧取得失敗");
    }
  };

  // 住民申請を押した際の小窓画面（モーダルウィンドウ）の開閉
  // isResidentOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する
  const openResindentModal = () => {
    setIsResidentOpen(true);
  };
  const closeResidentModal = () => {
    setIsResidentOpen(false);
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
              className={`${styles.btn1} ${alreadyError && styles.disabled}`}
              disabled={alreadyError ? true : false}
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
          <div className={styles.editbox}>
            <button id={styles.edit_btn} onClick={Handler}>
              編集・削除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
