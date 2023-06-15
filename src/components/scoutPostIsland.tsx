import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import styles from "../styles/message.module.css";
import { useNavigate, useParams } from "react-router-dom";

export default function ScoutPostIsland({ table }: { table: string }) {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState([]);
  const params = useParams();
  const paramsID = parseInt(params.id);

  const navi = useNavigate();

  //  データを取得
  useEffect(() => {
  }, []);





  return (
    <div>
      <div className={styles.text_body}>
        <h2 >〇〇島からスカウトが届きました！</h2>
        <button>参加する</button>
        <button>拒否する</button>
        <h4>〇〇島を見に行く</h4>
      </div>   
    </div>
  );
}
