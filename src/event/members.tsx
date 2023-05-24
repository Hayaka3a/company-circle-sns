import MembersList from "../components/members/MembersList";
import MenubarEvent from "../components/menubarEvent";
import { useEffect, useState } from "react";
import styles from "../styles/membersList.module.css";
import { supabase } from "../createClient.js";
import { Event } from "../types/members";
import { useParams } from "react-router-dom";

export default function EventMembers() {
  const [displayData, setDisplayData] = useState<Event>();

  //島情報のデータを取得
  const params = useParams();
  const paramsID = parseInt(params.id);
  useEffect(() => {
    fetchData();
  }, [paramsID]);

  async function fetchData() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq(`id`, paramsID)
      .eq(`status`, false);

    // データ取得時のエラー処理
    if (!data) return;
    if (error) {
      console.log(error);
    }

    const event = data[0] as Event;
    setDisplayData(event);
  }

  return (
    <>
      {displayData && (
        <div className={styles.display}>
          <MenubarEvent thumbnail={displayData.thumbnail} />
          <MembersList table="event" displayData={displayData} />
        </div>
      )}
    </>
  );
}
