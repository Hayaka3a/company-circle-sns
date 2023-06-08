import React, { useEffect, useState } from "react";
import MenubarEvent from "../components/menubarEvent";
import styles from "../styles/islandEdit.module.css"
import LogSt from "../components/cookie/logSt";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../createClient";
import CreateDeletePage from "../components/modalWindows/deleteEvent";
import CreateDeleteCheck from "../components/modalWindows/deleteEventCheck";
import CreateAfterDelete from "../components/modalWindows/deleteEventAfter";


export default function EventEdit() {
  LogSt();
  const id= useParams();
  const fetchEventID = id.id;

  useEffect(() => {
    fetchEvent();
    entryIsland();
  },[]);

  const navigate = useNavigate();
  // 削除のモーダルウィンドウの開閉
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [ isDeleteCheckOpen, setIsDeleteCheckOpen ] = useState(false);
  const [ isAfterDeleteOpen, setIsAfterDeleteOpen ] = useState(false);
  const [ inputValue, setInputValue ] = useState("");

  // 参加サークル選択ウィンドウの開閉
  const [selectedIsland, setSelectedIsland] = useState(false);

  
  const [eventID, setEventID] = useState<number>(); // eventIDステートに追加
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(""); 
  const [eventDetail, setEventDetail] = useState(""); // 取得したイベントの詳細情報を保持する状態変数
  const [eventJoin, setEventJoin] = useState("");
  const [imageUrl, setImageUrl] = useState("/login/loginCounter.png");
  const [editMode, setEditMode] = useState(false); //editMode 状態変数を追加


  // 参加サークル選択モーダルウィンドウの表示
  const selectionIslandOpen = () => {
    setSelectedIsland(true);
  };

  // 参加サークル選択モーダルウィンドウの非表示
  const selectionIslandClose = () => {
    setSelectedIsland(false);
  };



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



  // posts, eventsテーブルのstatusをtrueに変更
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
          .eq("id", eventID);

        if (eventsError || postsError) {
          console.error(
            "Error changing status :",
            eventsError || postsError,
          );
          // Cookie情報の削除
          if (document.cookie !== "") {
            let expirationDate = new Date ("1999-12-31T23:59:59Z");
            document.cookie = `id=; expires=${expirationDate.toUTCString()}; path=/;`;
            document.cookie = `loginSt=; expires=${expirationDate.toUTCString()}; path=/;`;
          }
        }

        console.log("Change status of events successfully.");
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
    }
  };


  const entryIsland = async () => {
    const { data, error } = await supabase
      .from("userEntryStatus")
      .select("islandID")
      .eq("eventID", fetchEventID);
  
    if (error) {
      console.log("参加サークル取得に失敗しました", error);
      return;
    }
  
    if (!data || data.length === 0) {
      console.log("該当する参加サークルが見つかりませんでした");
      return;
    }
  
    const joinIslandIDs = data.map((entry) => entry.islandID); // フィルタリングされたデータの島IDを抽出
  
    // islandsテーブルからislandNameを取得
    const { data: islandData, error: islandError } = await supabase
      .from("islands")
      .select("islandName")
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
    const joinedNames = islandNames.join(', '); // 配列の要素を結合した文字列を作成

    console.log("参加サークルの島名:", joinedNames);

    setEventJoin(joinedNames);  // 参加サークルをeventJoinステートにセット
  };


  // CSS部分で画像URLを変更（imgタグ以外で挿入すれば、円形にしても画像が収縮表示されない）
  useEffect(() => {
    let circleElement = document.getElementById("img");
    if (circleElement) {
      circleElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  },[imageUrl]);

  // 画像ファイル選択したら、表示画像に反映
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
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
  };

  const handleSave = async () => {
    await supabase.from("events").update([
      {
        eventName: eventName,
        startDate: startDate,
        endDate: endDate,
        detail: eventDetail,
      },
    ]).eq("id", fetchEventID);
    console.log("Data updated successfuly.");
  };

  const createHandler = async () => {
    if (eventName.trim() === "" || startDate.trim() === "" || endDate.trim() === "" || eventDetail.trim() === "") {
      alert("必須項目です。");
      return;
    }

    const eventData = {
      eventName: eventName,
      startDate: startDate,
      endDate: endDate,
      detail: eventDetail,
      status: "false"
    };
  }


  return (
    <div className={styles.flex}>
      <MenubarEvent />
      <div className={styles.back}>
        <div className={styles.event_detail}>
          <h1>イベント編集・削除</h1>

          <div>
          <label htmlFor="eventName">イベント名</label>
          <input 
            type="text" 
            id="eventName"
            value={eventName}
            onChange={handleEventNameChange}
            readOnly={!editMode} 
          />
          <br />
          <label htmlFor="thumbnail">サムネイル</label>
          <input 
            type="file" 
            id="thumbnail"
            className={styles.eventIcon}
            onChange={handleFileChange}
            disabled={!editMode} 
          />
          </div>


          <div>
            <label className={styles.detail}>開催日時</label>
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
          </div>


          <div>
            <label className={styles.detail}>イベント詳細</label>
              <input 
                type="text" 
                id="eventDetail"
                className={styles.center}
                value={eventDetail}
                onChange={handleEventDetailChange}
                readOnly={!editMode} 
              />
          </div>


          <div>
          <label>参加島（サークル）</label>
          {eventJoin}
          {editMode && (
            <div>
              <button onClick={selectionIslandOpen}>選択</button>
              {/* {selectedIsland && 
             } */}
            </div>
          )}
          {/* <input 
            type="text" 
            id="eventJoin" 
            class={styles.center}
            value={eventJoin}
            onChange={handleEventJoinChange}
            readOnly={!editMode}
          /> */}
          {/* {islandNames.map((name, index) => (
            <p key={index} class={styles.center}>
              {name}
            </p>
          ))} */}
        </div>


          <button id={styles.edit_btn} onClick={handleSaveClick}>
            {editMode ? "保存" : "編集"}
          </button>

          <button onClick={openDeleteModal}>削除</button>
          {isDeleteOpen && <CreateDeletePage closeDeleteModal={closeDeleteModal} nextOpen={nextOpen} />}
          {isDeleteCheckOpen && (
            <CreateDeleteCheck
            close2Modal={close2Modal}
            nextOpen2={nextOpen2}
            inputValue={inputValue}
            setInputValue={setInputValue}
            />
          )}
          {isAfterDeleteOpen && <CreateAfterDelete done={done}/>}
        </div>
      </div>
    </div>
  );
}



