import { Link } from "react-router-dom";
import LogSt from "../../components/cookie/logSt";
import styles from "../../styles/island/all.module.css";
import { useEffect, useState } from "react";
import FetchIslandsData from "./fetchIslnadsData";
import TruncateString from "./truncateString";

export default function IslandAll() {
  LogSt();
  const [islands, setIslands] = useState([]);

  useEffect(() => {
    // 島のデータを取得する関数
    FetchIslandsData(islands, setIslands);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.flex}>
      <div className={styles.all}>
        <h2 className={styles.title}>島一覧</h2>
        <div className={styles.eventAll}>
          {islands.map((island) => (
            <Link
              to={`/island/${island.id}`}
              className={styles.link}
              key={island.id}
            >
              <div key={island.id} className={styles.event1}>
                <div className={styles.imgSide}>
                  <img
                    className={styles.icon1}
                    src={island.thumbnail || "/island/island_icon.png"}
                    alt="island Thumbnail"
                  ></img>
                </div>
                <div className={styles.eventInfo}>
                  <h2 className={styles.eventName}>{island.islandName}</h2>
                  <p>
                    <TruncateString str={island.detail} maxLength={100} />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
