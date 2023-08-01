// 島データ取得

import React, { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import { Link } from "react-router-dom";
import styles from "../../styles/index.module.css";

export default function FetchIslands() {
  const [islands, setIslands] = useState([]);

  const fetchIslands = async () => {
    try {
      const { data, error } = await supabase
        .from("islands")
        .select("*")
        .eq("status", false);

      if (error) {
        console.error("島情報取得失敗", error.message);
      } else {
        // データをランダムに並び替える
        const shuffledData = data.sort(() => Math.random() - 0.5);
        setIslands(shuffledData);
      }
    } catch (error) {
      console.error("島情報取得失敗", error.message);
      setIslands([]);
    }
  };

  useEffect(() => {
    fetchIslands();
  }, []);

  return (
    <div className={styles.islands}>
      {islands.slice(0, 6).map((island) => (
        <div key={island.id} className={styles.island}>
          <Link to={`/island/${island.id}`} className={styles.link}>
            <img
              className={styles.icon}
              src={
                island.thumbnail ||
                "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-08T07%3A12%3A33.854Z"
              }
              alt="Event Thumbnail"
            />
            <h3 className={styles.islandName}>{island.islandName}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
