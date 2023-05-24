import React, { useState } from "react";
import Menubar from "../components/menubarIsland";
import MenubarIsland from "../components/menubarIsland";
import styles from "../styles/island/islandDetail.module.css";
import CreateSendingMessage from "../components/modalWindows/createSendingMessage";

export default function IslandDetail() {
    const [isOpen, setIsOpen] = useState(false);

    // メッセージを送るを押した際の小窓画面（モーダルウィンドウ）の開閉
    // isOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する

    const openModal = () => {
      setIsOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
    };

  return (
      <div className={styles.flex}>
        <MenubarIsland thumbnail="/login/loginCounter.png" />
        <div className={styles.island_detail}>
          <img src="/island/island_icon.png" alt="サークルアイコン" />
            <h2>〇〇島</h2>
            <p className={styles.textDetail}>
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
            </p>

            <div className={styles.btn}>
              <button>住民申請</button>
              <button onClick={openModal}>メッセージを送る</button>
              {isOpen && <CreateSendingMessage closeModal={closeModal} />}
            </div>
            <button id={styles.edit_btn}>編集・削除</button>
        </div>
      </div>    
  );
}
