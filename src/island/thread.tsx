import React, { useState } from "react";
import CreateThread from "../components/modalWindows/createThread";

export default function IslandThread() {
  const [isOpen, setIsOpen] = useState(false);

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
      <button onClick={openModal}>スレッドを作成する</button>
      {isOpen && <CreateThread closeModal={closeModal} />}
    </>
  );
}
