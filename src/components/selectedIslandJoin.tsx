import React, { useEffect, useState } from "react";
import { supabase } from "../createClient";
import styles from "../styles/island/createIsland.module.css";

export default function SelectedIslandJoin({
  fetchEventID,
  setIslandJoinID,
  setEventJoin,
}) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [joinIslandData, setJoinIslandData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("userEntryStatus")
        .select("islandID, status")
        .eq("eventID", fetchEventID)
        .eq("status", false);

      if (error) {
        console.log("参加サークル取得に失敗しました", error);
        return;
      }

      if (!data || data.length === 0) {
        console.log("該当する参加サークルが見つかりませんでした");
        return;
      }

      const joinIslandIDs = data.map((entry) => entry.islandID);
      setIslandJoinID(joinIslandIDs); 

      // 島の名前を取得して設定
      const islandNamesPromises = joinIslandIDs.map(async (islandID) => {
        const { data: islandData, error: islandError } = await supabase
          .from("islands")
          .select("islandName")
          .eq("id", islandID)
          .single();

        if (islandError) {
          console.log("島名取得に失敗しました", islandError);
          return null;
        }

        return islandData.islandName;
      });

      const islandNames = await Promise.all(islandNamesPromises);
      setJoinIslandData(islandNames);

      setDataLoaded(true);
    };

    fetchData();
  }, [fetchEventID, setIslandJoinID]);

const handleIslandDelete = async (index) => {
const deletedIslandName = joinIslandData[index]; // 参加島の名前を取得する
  
    // islandsテーブルから参加島の名前に対応するデータのidを取得
    const { data: islandData, error: islandError } = await supabase
      .from("islands")
      .select("id")
      .eq("islandName", deletedIslandName)
      .single();
  
    if (islandError) {
      console.log("参加島のデータの取得に失敗しました。", islandError);
      return;
    }
  
    const islandID = islandData.id;
    console.log("島のid", islandID)
  
    // userEntryStatusテーブルの該当参加島のstatusをtrueに変更
    const { error: updateError } = await supabase
      .from("userEntryStatus")
      .update({ status: true })
      .eq("islandID", islandID)
      .eq("eventID", fetchEventID);
  
    if (updateError) {
      console.log("データの更新に失敗しました。", updateError);
    } else {
      // 参加島の島名をnullに設定して非表示にする
      setJoinIslandData((prevData) =>
        prevData.map((islandName, i) =>
          i === index ? null : islandName
        )
      );
    }
  };
        

    return (
        <div>
          {dataLoaded &&
            joinIslandData.map((islandName, index) =>
              islandName !== null ? (
                <div className={styles.nameFlex}>
                    <div key={index} className={styles.selectedValue}>
                    <div className={styles.nameFlex}>
                        <span className={styles.nowrap}>                  
                                {islandName}
                        </span>
                        <button onClick={() => handleIslandDelete(index)}>×</button>
                    </div>
                    </div>
                </div>
              ) : null
            )}
        </div>
      );
}