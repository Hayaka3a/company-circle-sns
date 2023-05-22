import ParticipantList from "../components/ParticipantList";
import MenubarIsland from "../components/menubarIsland";
import styles from "../styles/participantList.module.css";

export default function IslandMenbers() {
  //島情報のデータを取得
  const islandData = { ここでデータを取得: undefined, thumbnail: "imageURL" };

  return (
    <>
      <div className={styles.display}>
        <MenubarIsland thumbnail={islandData.thumbnail} />
        <ParticipantList table={"island"} />
      </div>
    </>
  );
}
