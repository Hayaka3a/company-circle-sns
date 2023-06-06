import { Link, useNavigate, useParams } from "react-router-dom";
import LogSt from "../components/cookie/logSt";
import styles from "../styles/island/all.module.css";
import { supabase } from "../createClient";

import { useEffect, useState } from "react";

export default function IslandAll() {
  LogSt();
  const navigate = useNavigate();
  const params = useParams();
  const paramsID = params.id;

  const [islands, setIslands] = useState([]);

  // 島のデータを取得する関数
  const fetchIslandsData = async () => {
    const { data, error } = await supabase
      .from("islands")
      .select("*")
      .eq("status", "false");

    if (error) {
      console.error("islandsテーブルデータ情報取得失敗", error);
      return;
    }

    setIslands(data);
  };
  useEffect(() => {
    fetchIslandsData();
  }, []);

  // 「活動用内容」100文字以降は...で表示する
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className={styles.flex}>
      <div className={styles.all}>
        <h2 className={styles.title}>島一覧</h2>
        <div className={styles.eventAll}>
          {islands.map((island) => (
            <div key={island.id} className={styles.event1}>
              <div className={styles.imgSide}>
                <img
                  className={styles.icon}
                  src={island.thumbnail || "/island/island_icon.png"}
                  alt="island Thumbnail"
                ></img>
              </div>
              <div className={styles.eventInfo}>
                <Link to={`/island/${paramsID}`}>
                  <h2 className={styles.eventName}>{island.islandName}</h2>
                </Link>
                <p>{truncateString(island.detail, 100)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
