import { useEffect, useState } from "react";
import ParticipantList from "../components/ParticipantList";
import MenubarIsland from "../components/menubarIsland";
import styles from "../styles/participantList.module.css";
import { supabase } from "../createClient.js";
import { Island } from "../types/menbers";
import { useParams } from "react-router-dom";

export default function IslandMenbers() {
  const [displayData, setDisplayData] = useState<Island>();

  // DBからデータを取得
  const params = useParams();
  const paramsID = parseInt(params.id);
  useEffect(() => {
    fetchData();
  }, [paramsID]);

  async function fetchData() {
    const { data, error } = await supabase
      .from("islands")
      .select("*")
      .eq(`id`, paramsID);

    // データ取得時のエラー処理
    if (!data) return;
    if (error) {
      console.log(error);
    }

    const island = data[0] as Island;
    setDisplayData(island);
  }
  return (
    <>
      <div className={styles.display}>
        <MenubarIsland thumbnail={"a"} />
        {displayData && (
          <ParticipantList table="island" displayData={displayData} />
        )}
      </div>
    </>
  );
}
