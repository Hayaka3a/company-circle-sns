import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import styles from "../styles/message.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import LogSt from "./cookie/logSt";
import { useCookies } from "react-cookie";
import HandleReject from "./handleReject";
import FetchEventData from "./fetchEventData";
import HandleEventJoin from "./handleEventJoin";

export default function ScoutPostEvent({ table }: { table: string }) {
  LogSt();

  // メッセージの型定義
  interface Message {
    id: number;
    postedBy: number;
  }

  const params = useParams();
  const paramsID = parseInt(params.id);

  const [cookies] = useCookies(["id"]);
  const id = cookies.id;

  const [eventName, setEventName] = useState("");
  const [event, setEvent] = useState<any>(null);
  const [isButtonsVisible, setIsButtonsVisible] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    FetchEventData(paramsID, setEventName, setEvent, setIsButtonsVisible);
  }, [paramsID]);

  // 参加するボタンがクリックされた時の処理
  const handleJoinClick = () => {
    HandleEventJoin(paramsID, id, setIsButtonsVisible);
  };

  // 拒否ボタンがクリックされた時の処理
  const handleRejectClick = () => {
    HandleReject(paramsID, id, setIsButtonsVisible);
  };

  const handleGoToEvent = () => {
    // イベント詳細画面に遷移
    navigate(`/event/${event?.id}`);
  };

  return (
    <div>
      <div className={styles.text_body}>
        <h2>{eventName}からスカウトが届きました！</h2>
        {isButtonsVisible && (
          <>
            <button onClick={handleJoinClick}>参加する</button>
            <button onClick={handleRejectClick}>拒否する</button>
          </>
        )}
        {!isButtonsVisible && <p>回答しました</p>}
        <Link onClick={handleGoToEvent} to={`/event/${event?.id}`}>
          <h4>{eventName}を見に行く</h4>
        </Link>
      </div>
    </div>
  );
}
