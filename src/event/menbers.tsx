import ParticipantList from "../components/ParticipantList";
import MenubarEvent from "../components/menubarEvent";
import MenubarIsland from "../components/menubarIsland";
import styles from "../styles/participantList.module.css";

export default function eventMenbers() {
  //島情報のデータを取得
  const islandData = { ここでデータを取得: undefined, thumbnail: "imageURL" };

  return (
    <>
      <div className={styles.display}>
        <MenubarEvent thumbnail={islandData.thumbnail} />
        <ParticipantList table={"event"} />
      </div>
    </>
  );
}
