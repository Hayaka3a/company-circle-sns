import ParticipantList from "../components/ParticipantList";
import MenubarEvent from "../components/menubarEvent";
import { useEffect, useState } from "react";
import styles from "../styles/participantList.module.css";
import { supabase } from "../createClient.js";
import { Event } from "../types/menbers";
import { useParams } from "react-router-dom";

export default function EventMenbers() {
  const [displayData, setDisplayData] = useState<Event>();

  //島情報のデータを取得
  const params = useParams();
  const paramsID = parseInt(params.id);
  useEffect(() => {
    console.log("useEffect");
    fetchData();
  }, [paramsID]);

  async function fetchData() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq(`id`, paramsID);

    // データ取得時のエラー処理
    if (!data) return;
    if (error) {
      console.log(error);
    }

    const island = data[0] as Event;
    setDisplayData(island);
  }

  return (
    <>
      <div className={styles.display}>
        {/* <MenubarEvent thumbnail={eventData.thumbnail} /> */}
        <ParticipantList table={"event"} displayData={displayData} />
      </div>
    </>
  );
}
