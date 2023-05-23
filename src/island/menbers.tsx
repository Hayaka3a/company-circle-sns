import { useEffect, useState } from "react";
import ParticipantList from "../components/ParticipantList";
import MenubarIsland from "../components/menubarIsland";
import styles from "../styles/participantList.module.css";
import { supabase } from "../createClient.js";
import { Island } from "../types/menbers";

export default function IslandMenbers() {
  // const islandData = { thumbnail: "a" };
  const [islandData, setIslandData] = useState({ thumbnail: "a" });

  // useEffect(() => {
  //   // 下に書いたfetchUsersを実行する
  //   fetchUsers();
  // }, []);
  // supabaseからusers tableの情報を取得する
  // async function fetchUsers() {
  //   const data = await supabase.from("islands").select("*");
  //   const islandData:Island = data.data[0];
  //   setIslandData(islandData);
  // }
  return (
    <>
      <div className={styles.display}>
        <MenubarIsland thumbnail={islandData.thumbnail} />
        <ParticipantList table={"island"} />
      </div>
    </>
  );
}
