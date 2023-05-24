import Thread from "../components/Thread";
import FetchEventThreads from "../components/hooks/FetchEventThreads";
import styles from "../styles/thread.module.css";
import MenubarEvent from "../components/menubarEvent";

export default function EventThread() {
  // イベントID仮置き
  const eventID = 2;
  // スレッドデータの取得
  const thread = FetchEventThreads(eventID, "eventID");

  return (
    <>
      <div className={styles.flex}>
        <MenubarEvent thumbnail={""} />
        <div className={styles.threadWrapper}>
          <Thread thread={thread} />
        </div>
      </div>
    </>
  );
}
