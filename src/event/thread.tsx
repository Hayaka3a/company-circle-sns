import Thread from "../components/Thread";
import FetchEventThreads from "../components/hooks/FetchEventThreads";
import styles from "../styles/thread.module.css";
import MenubarEvent from "../components/menubarEvent";
import CreateThread from "../components/modalWindows/createThread";
import { useState } from "react";
import LogSt from "../components/cookie/logSt";

export default function EventThread() {
  LogSt();
  const [isOpen, setIsOpen] = useState(false);

  // イベントID仮置き
  const eventID = 2;
  // スレッドデータの取得
  const thread = FetchEventThreads(eventID, "eventID");

  // スレッド作成の小窓画面（モーダルウィンドウ）の開閉
  // isOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.flex}>
        <MenubarEvent thumbnail={""} />
        <div className={styles.threadWrapper}>
          <button onClick={openModal}>スレッドを作成する</button>
          {isOpen && (
            <CreateThread
              closeModal={closeModal}
              islandID={null}
              eventID={eventID}
            />
          )}
          <Thread thread={thread} />
        </div>
      </div>
    </>
  );
}
