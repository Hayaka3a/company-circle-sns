import { useEffect, useState } from "react";
import MenubarEvent from "../components/menubarEvent";
import styles from "../styles/island/islandDetail.module.css";
import CreateSendingMessage from "../components/modalWindows/createSendingMessage";
import CreateResidentApplication from "../components/modalWindows/createResidentApplication";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../createClient";
import LogSt from "../components/cookie/logSt";
import { Event } from "../types/members";

export default function EventDetail() {
  LogSt();
  const [isOpen, setIsOpen] = useState(false);
  const [isResidentOpen, setIsResidentOpen] = useState(false);
  const navigate = useNavigate();
  const eventId = useParams();
  const [eventDetail, setEventDetail] = useState<Event>(null); // 取得した島の詳細情報を保持する状態変数
  const [eventImage, setEventImage] = useState(
    "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-05T07%3A40%3A07.886Z",
  );

  const [islandArray, setIslandArray] = useState([]);

  useEffect(() => {
    fetchEventDetail();
    fetchIsland();
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
    navigate("/event/edit");
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
            <tbody>
              <tr>
                <td className={styles.td1}>開催日時</td>
                <td className={styles.td2}>
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
                <td className={styles.td1}>イベント詳細</td>
                <td className={styles.td2}>
                  <p className={styles.textDetail}>
                    {eventDetail && eventDetail.detail}
                  </p>
                </td>
              </tr>
              <tr>
                <td className={styles.td1}>参加島</td>
                <td className={styles.td2}>
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
            <button onClick={openResindentModal} className={styles.btn1}>
              住民申請
            </button>
            {isResidentOpen && (
              <CreateResidentApplication
                closeResidentModal={closeResidentModal}
                table="event"
                islandName={eventDetail.eventName}
              />
            )}
            <button onClick={openModal} className={styles.btn2}>
              メッセージを送る
            </button>
            {isOpen && (
              <CreateSendingMessage closeModal={closeModal} table="event" />
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
