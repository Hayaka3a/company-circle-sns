import React, { useEffect, useState } from "react";
import MenubarEvent from "../components/menubar/menubarEvent";
import styles from "../styles/eventDetail.module.css";
import LogSt from "../components/cookie/logSt";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../createClient";
import CreateDeletePage from "../components/modalWindows/deleteEvent";
import CreateDeleteCheck from "../components/modalWindows/deleteEventCheck";
import CreateAfterDelete from "../components/modalWindows/deleteEventAfter";
import IslandSelected from "../components/islandSelected";

export default function EventEdit() {
  LogSt();
  const id = useParams();
  const fetchEventID = id.id;

  useEffect(() => {
    fetchEvent();
    entryIsland();
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
  const [editMode, setEditMode] = useState(false); //editMode 状態変数を追加
  const [islandJoinID, setIslandJoinID] = useState("");

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

  // 削除完了ウィンドウを閉じると、データが論理削除されて新規イベント作成画面に遷移する
  const done = async () => {
    setIsAfterDeleteOpen(false);

    // posts, events,userEntryStatusテーブルのstatusをtrueに変更
    const { data, error } = await supabase
      .from("events")
      .select("eventName")
      .eq("id", eventID);

    if (error) {
      console.log("Error fetching events data", error);
    }
    if (data && data.length > 0) {
      const eventName = data[0].eventName;

      if (eventName === inputValue) {
        const { error: eventsError } = await supabase
          .from("events")
          .update({ status: "true" })
          .eq("id", eventID);

        const { error: postsError } = await supabase
          .from("posts")
          .update({ status: "true" })
          .eq("eventID", eventID);

        const { error: userEntryStatusError } = await supabase
          .from("userEntryStatus")
          .update({ status: "true" })
          .match({ eventID: fetchEventID });

        if (eventsError || postsError || userEntryStatusError) {
          console.error(
            "Error changing status :",
            eventsError || postsError || userEntryStatusError,
          );
        }

        navigate("/");
        window.location.reload();
      }
    }
  };

  // データベースからevents情報を取得
  const fetchEvent = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("id", fetchEventID);

    if (data) {
      const event = data[0];
      const fetcheventID = event.id;

      setEventID(fetcheventID); // eventIDステートに値をセット
      setEventName(event.eventName); // イベント名をeventNameステートにセット
      setStartDate(event.startDate); // イベント開始日時（startDate）をstartDateステートにセット
      setEndDate(event.endDate); // イベント終了日時（endDate）をendDateステートにセット
      setEventDetail(event.detail); // イベント詳細をeventDetailステートにセット
      setImageUrl(event.thumbnail); // サムネイルをthumbnailステートにセット
    }
  };

  const entryIsland = async () => {
    const { data, error } = await supabase
      .from("userEntryStatus")
      .select("islandID, status")
      .eq("eventID", fetchEventID);

    if (error) {
      console.log("参加サークル取得に失敗しました", error);
      return;
    }

    if (!data || data.length === 0) {
      console.log("該当する参加サークルが見つかりませんでした");
      return;
    }

    const joinIslandIDs = data
      .filter((entry) => entry.status === false) // statusがfalseのデータのみフィルタリング
      .map((entry) => entry.islandID); // フィルタリングされたデータの島IDを抽出

    if (joinIslandIDs.length === 0) {
      console.log("該当する参加サークルが見つかりませんでした");
      return;
    }

    setIslandJoinID(joinIslandIDs[0]);

    // islandsテーブルからislandNameを取得
    const { data: islandData, error: islandError } = await supabase
      .from("islands")
      .select("islandName, id")
      .in("id", joinIslandIDs);

    if (islandError) {
      console.log("島名取得に失敗しました", islandError);
      return;
    }

    if (!islandData || islandData.length === 0) {
      console.log("該当する島が見つかりませんでした");
      return;
    }

    const islandNames = islandData.map((island) => island.islandName);
    const joinedNames = islandNames.join(", "); // 配列の要素を結合した文字列を作成

    setEventJoin(joinedNames); // 参加サークルをeventJoinステートにセット
  };

  const handleHideEventJoin = async () => {
    supabase
      .from("userEntryStatus")
      .update({ status: true })
      .eq("eventID", fetchEventID)
      .then((response) => {
        // データの更新が成功した場合
        if (response.error) {
          console.log("データの更新に失敗しました。", response.error);
        } else {
          // 参加サークル名を非表示にする
          setEventJoin(null);
        }
      });
  };

  // CSS部分で画像URLを変更（imgタグ以外で挿入すれば、円形にしても画像が収縮表示されない）
  useEffect(() => {
    let circleElement = document.getElementById("img");
    if (circleElement) {
      circleElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  }, [imageUrl]);

  // 画像ファイル選択したら、表示画像に反映
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      // 画像が選択されていないのでreturn
      return;
    }

    const file = event.target.files?.[0];
    const random = Math.floor(Math.random() * 10000);
    const filePath = `${file.name}${random}`; // 画像の保存先のpathを指定
    const { error } = await supabase.storage
      .from("islandIcon")
      .upload(filePath, file);
    if (error) {
      console.log(error, "画像追加エラー", filePath);
    }

    const { data } = supabase.storage.from("islandIcon").getPublicUrl(filePath);
    setImageUrl(data.publicUrl);
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
    setEditMode((prev) => !prev);
    if (!editMode) {
      return;
    }
    handleSave();
    createHandler();
    addIsland();
  };

  const handleSave = async () => {
    await supabase
      .from("events")
      .update([
        {
          eventName: eventName,
          startDate: startDate,
          endDate: endDate,
          detail: eventDetail,
          thumbnail: imageUrl,
        },
      ])
      .eq("id", fetchEventID);
    console.log("Data updated successfuly.");
  };

  const createHandler = async () => {
    if (
      eventName.trim() === "" ||
      startDate.trim() === "" ||
      endDate.trim() === "" ||
      eventDetail.trim() === ""
    ) {
      alert("必須項目です。");
      return;
    }

    const eventData = {
      eventName: eventName,
      startDate: startDate,
      endDate: endDate,
      detail: eventDetail,
      status: "false",
    };
  };

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
                    readOnly={!editMode}
                  />
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
                    onChange={handleFileChange}
                    disabled={!editMode}
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
                    readOnly={!editMode}
                  />
                  <input
                    type="text"
                    id="endDate"
                    className={styles.center}
                    value={endDate}
                    onChange={handleEndDateChange}
                    readOnly={!editMode}
                  />
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
                    readOnly={!editMode}
                  />
                </td>
              </tr>

              <tr className={styles.tr}>
                <th className={styles.th}>参加島（サークル）</th>
                <td className={styles.td}>
                  {eventJoin && (
                    <div>
                      <p>{eventJoin}</p>
                      {editMode && (
                        <button onClick={handleHideEventJoin}>×</button>
                      )}
                    </div>
                  )}
                  {editMode && (
                    <IslandSelected
                      islandIDs={[islandJoinID]} // islandIDsを配列として初期化する
                      setIslandTags={setIslandTags}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <button
            id={styles.edit_btn}
            onClick={handleSaveClick}
            className={styles.edit_btn}
          >
            {editMode ? "保存" : "編集"}
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
          {isAfterDeleteOpen && <CreateAfterDelete done={done} />}
        </div>
      </div>
    </div>
  );
}
