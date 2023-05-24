import React, { useState } from "react";
import CreateThread from "../components/modalWindows/createThread";
import FetchIslandThreads from "../components/hooks/FetchIslandThreads";
import Thread from "../components/Thread";
import MenubarIsland from "../components/menubarIsland";
import styles from "../styles/thread.module.css";

export default function IslandThread() {
  const [isOpen, setIsOpen] = useState(false);
  // 仮置き
  const islandID = 1;
  // スレッドデータの取得
  const thread = FetchIslandThreads(islandID, "islandID");

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
        <MenubarIsland thumbnail={null} />
        <div className={styles.threadWrapper}>
          <button onClick={openModal}>スレッドを作成する</button>
          {isOpen && <CreateThread closeModal={closeModal} />}
          <Thread thread={thread} />
        </div>
      </div>
    </>
  );
}
