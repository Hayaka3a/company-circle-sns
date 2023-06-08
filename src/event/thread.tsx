import Thread from "../components/Thread";
import FetchEventThreads from "../components/hooks/FetchEventThreads";
import styles from "../styles/thread.module.css";
import MenubarEvent from "../components/menubarEvent";
import CreateThread from "../components/modalWindows/createThread";
import { useState } from "react";
import LogSt from "../components/cookie/logSt";
import { useParams } from "react-router-dom";

export default function EventThread() {
  LogSt();
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const eventID = Number(id);

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
        <MenubarEvent />
        <div className={styles.threadWrapper}>
          <button onClick={openModal} className={styles.btn}>
            スレッドを作成する
          </button>
          {isOpen && (
            <CreateThread
              closeModal={closeModal}
              islandID={null}
              eventID={eventID}
            />
          )}
          {thread.length ? (
            <Thread thread={thread} />
          ) : (
            <p>現在スレッドは追加されていません</p>
          )}
        </div>
      </div>
    </>
  );
}
