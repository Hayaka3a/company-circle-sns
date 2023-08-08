import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import styles from "../styles/message.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import LogSt from "./cookie/logSt";
import { useCookies } from "react-cookie";
import HandleReject from "./handleReject";
import FetchIslandData from "./fetchIslandData";
import HandleIslandJoin from "./handleIslandJoin";

export default function ScoutPostIsland({ table }: { table: string }) {
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

  const [islandName, setIslandName] = useState("");
  const [island, setIsland] = useState<any>(null)
  const [isButtonsVisible, setIsButtonsVisible] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    FetchIslandData(paramsID, setIslandName, setIsland, setIsButtonsVisible)  
  }, [paramsID]);


  // 参加するボタンがクリックされた時の処理
  const handleJoinClick = () => {
    HandleIslandJoin(paramsID, id, setIsButtonsVisible)   
  };

  // 拒否ボタンがクリックされた時の処理
  const handleRejectClick = () => {
    HandleReject(paramsID, id, setIsButtonsVisible);
  };

 const handleGoToIsland = () => {
    // 島詳細画面に遷移
    navigate(`/island/${island?.id}`);
 };

 return (
  <div>
    <div className={styles.text_body}>
      <h2 >{islandName}島からスカウトが届きました！</h2>
      {isButtonsVisible && (
          <>
            <button onClick={handleJoinClick}>参加する</button>
            <button onClick={handleRejectClick}>拒否する</button>
          </>
        )}
        {!isButtonsVisible && (
          <p>回答しました</p>
        )}
        <Link onClick={handleGoToIsland} to={`/island/${island?.id}`}>
          <h4>{islandName}島を見に行く</h4>
        </Link>
    </div>   
  </div>
);
}
