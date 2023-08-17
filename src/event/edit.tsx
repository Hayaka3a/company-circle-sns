import React, { useEffect, useState } from "react";
import MenubarEvent from "../components/menubar/menubarEvent/menubarEvent";
import styles from "../styles/eventDetail.module.css";
import LogSt from "../components/cookie/logSt";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../createClient";
import CreateDeletePage from "../components/modalWindows/deleteEvent";
import CreateDeleteCheck from "../components/modalWindows/deleteEventCheck";
import CreateAfterDelete from "../components/modalWindows/deleteEventAfter";
import IslandSelected from "../components/islandSelected/islandSelected";
import EventDone from "../components/eventDone";
import FetchEvent from "../components/fetchEvent";
import EntryIsland from "../components/entryIsland";
import HandleHideEventJoin from "../components/handleHideEventJoin";
import HandleFileChange from "../components/handleFileChange";
import HandleSave from "../components/handleSave";

export default function EventEdit() {
  LogSt();
  const id = useParams();
  const fetchEventID = id.id;

  useEffect(() => {
    fetchEventData();
    entryIslandData();
    // addIsland();
  }, []);

  const navigate = useNavigate();
  // 削除のモーダルウィンドウの開閉
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteCheckOpen, setIsDeleteCheckOpen] = useState(false);
  const [isAfterDeleteOpen, setIsAfterDeleteOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // 参加サークル追加
  const [islandTags, setIslandTags] = useState<
    { id: number; islandName: string }[]
  >([]);

  const [eventID, setEventID] = useState<number>(); // eventIDステートに追加
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventDetail, setEventDetail] = useState(""); // 取得したイベントの詳細情報を保持する状態変数
  const [eventJoin, setEventJoin] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [islandJoinID, setIslandJoinID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [nameAlreadyError, setNameAlreadyError] = useState("");

  // イベントを削除してもよろしいですか？モーダルウィンドウを表示
  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };
  // イベントを削除してもよろしいですか？モーダルウィンドウを非表示
  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  // イベントを削除してもよろしいですか？を閉じて、入力ウィンドウを表示
  const nextOpen = () => {
    setIsDeleteOpen(false);
    setIsDeleteCheckOpen(true);
  };

  // 入力のウィンドウを閉じて、削除完了のウィンドウを表示する
  const nextOpen2 = () => {
    setIsDeleteCheckOpen(false);
    setIsAfterDeleteOpen(true);
  };

  // 入力ウィンドウで×ボタンを押したら画面が閉じる
  const close2Modal = () => {
    setIsDeleteCheckOpen(false);
  };

  // 削除完了ウィンドウを閉じると、データが論理削除されてトップ画面に遷移する
  const handleDone = async () => {
    await EventDone(
      eventID,
      inputValue,
      fetchEventID,
      setIsAfterDeleteOpen,
      navigate,
    );
  };

  // データベースからevents情報を取得
  const fetchEventData = async () => {
    await FetchEvent(
      fetchEventID,
      setEventID,
      setEventName,
      setStartDate,
      setEndDate,
      setEventDetail,
      setImageUrl,
    );
  };

  const entryIslandData = async () => {
    await EntryIsland(fetchEventID, setIslandJoinID, setEventJoin);
  };

  const handleHideEventJoinData = async () => {
    await HandleHideEventJoin(fetchEventID, setEventJoin);
  };

  //ひとつ前のページに戻る
  const navi = useNavigate();
  const pageBack = () => {
    navi(-1);
  };
  

  // CSS部分で画像URLを変更（imgタグ以外で挿入すれば、円形にしても画像が収縮表示されない）
  useEffect(() => {
    let circleElement = document.getElementById("img");
    if (circleElement) {
      circleElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  }, [imageUrl]);

  // 画像ファイル選択したら、表示画像に反映
  const handleFileChangeData = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    await HandleFileChange(event, setImageUrl);
  };

  // 編集ボタンを押下、イベント名を変更
  const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
  };

  // 編集ボタンを押下、開催日時(startDate)を変更
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  // 編集ボタンを押下、開催日時(endDate)を変更
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  // 編集ボタンを押下、イベント詳細内容を変更
  const handleEventDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventDetail(e.target.value);
  };

  // 編集ボタンを押下、参加サークルの変更
  const handleEventJoinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventJoin(e.target.value);
  };

  // 保存処理の実装
  const handleSaveClick = () => {
    const maxEventNameLength = 100;
    const maxEventDetailLength = 300;   
        
    if (eventName.trim() === "" || eventDetail.trim() === "" || startDate.trim() === "" || endDate.trim() === "") {
      setNameAlreadyError("必須項目です。");
      return;
    }

    if (eventName.length > maxEventNameLength) {
      setNameAlreadyError(
        `イベント名は${maxEventNameLength}文字以内で入力してください。`,
      );
      return;
    }

    if (eventDetail.length > maxEventDetailLength) {
      setNameAlreadyError(
        `イベント詳細は${maxEventDetailLength}文字以内で入力してください。`,
      );
      return;
    }

    handleSaveData();
    createHandler();
    addIsland();

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  

  const handleSaveData = async () => {
    await HandleSave(
      eventName,
      startDate,
      endDate,
      eventDetail,
      imageUrl,
      fetchEventID,
    );
  };

  const createHandler = async () => {  
    const eventData = {
      eventName: eventName,
      startDate: startDate,
      endDate: endDate,
      detail: eventDetail,
      status: "false",
    };
  };

  useEffect(() => {
    if (errorMessage) {      
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);



  // 参加サークルをuserEntryStatusテーブルに追加
  const addIsland = async () => {
    if (islandTags) {
      await Promise.all(
        islandTags.map(async (island) => {
          const islandEvent = {
            islandID: island.id,
            eventID: fetchEventID,
            status: "false",
          };

          const { error: islandEventError } = await supabase
            .from("userEntryStatus")
            .insert(islandEvent);

          if (islandEventError) {
            console.error("共同開催島情報追加失敗");
          }
          window.location.reload();
        }),
      );
    }
  };

  return (
    <div className={styles.flex}>
      <MenubarEvent />
      <div className={styles.back}>
        <div className={styles.event_detail}>
          <h2>イベント編集・削除</h2>

          {errorMessage && <p>{errorMessage}</p>}

          <table className={styles.table}>
            <tbody className={styles.tbody}>
              <tr className={styles.tr}>
                <th className={styles.th}>イベント名</th>
                <td className={styles.td}>
                  <input
                    type="text"
                    id="eventName"
                    value={eventName}
                    onChange={handleEventNameChange}
                  />
                  {!eventName.trim() && (
                  <p className={styles.errorText}>イベント名は必須です。</p>
                )}
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>イベント詳細</th>
                <td className={styles.td}>
                  <input
                    type="text"
                    id="eventDetail"
                    className={styles.center}
                    value={eventDetail}
                    onChange={handleEventDetailChange}
                  />
                 {!eventDetail.trim() && (
                  <p className={styles.errorText}>イベント詳細は必須です。</p>
                )}
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>サムネイル</th>
                <td className={styles.td}>
                  <img
                    className={styles.icon}
                    src={imageUrl || "/event/party.png"}
                    alt="event Thumbnail"
                  />
                  <input
                    type="file"
                    id="thumbnail"
                    className={styles.eventIcon}
                    onChange={handleFileChangeData}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>開催日時</th>
                <td className={styles.td}>
                  <input
                    type="text"
                    id="startDate"
                    className={styles.center}
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                  <input
                    type="text"
                    id="endDate"
                    className={styles.center}
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </td>
              </tr>

              <tr className={styles.tr}>
                <th className={styles.th}>参加島（サークル）</th>
                <td className={styles.td}>
                  {eventJoin && (
                    <div>
                      <p>{eventJoin}</p>
                        <button onClick={handleHideEventJoinData}>×</button>
                    </div>
                  )}
                    <IslandSelected
                      islandIDs={[islandJoinID]} // islandIDsを配列として初期化する
                      setIslandTags={setIslandTags}
                    />
                </td>
              </tr>
            </tbody>
          </table>
             <button
             id={styles.edit_btn}
             onClick={handleSaveClick}
             className={styles.edit_btn} 
             disabled={
              !eventName.trim() ||
              !startDate.trim() ||
              !endDate.trim() ||
              !eventDetail.trim() ||
              !!nameAlreadyError ? true : false
             }
             >
              保存
             </button>
             <button
              type="button"
              className={styles.noEdit}
              onClick={() => {
                pageBack();
              }}
             >
              編集せずに戻る
             </button>
         
          <div className={styles.delete}>
            <button onClick={openDeleteModal} className={styles.delete_btn}>
              削除
            </button>

          </div>
          {isDeleteOpen && (
            <CreateDeletePage
              closeDeleteModal={closeDeleteModal}
              nextOpen={nextOpen}
            />
          )}
          {isDeleteCheckOpen && (
            <CreateDeleteCheck
              close2Modal={close2Modal}
              nextOpen2={nextOpen2}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          )}
          {isAfterDeleteOpen && <CreateAfterDelete done={handleDone} />}
        </div>
      </div>
    </div>
  );
}
