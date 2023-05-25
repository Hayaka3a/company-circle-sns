import React, { useState } from "react";
import Menubar from "../components/menubarIsland";
import MenubarIsland from "../components/menubarIsland";
import styles from "../styles/island/islandDetail.module.css";
import CreateSendingMessage from "../components/modalWindows/createSendingMessage";
import CreateResidentApplication from "../components/modalWindows/createResidentApplication";
import { Link } from "react-router-dom";

export default function IslandDetail() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isResidentOpen, setIsResidentOpen ] = useState(false);

    // 住民申請を押した際の小窓画面（モーダルウィンドウ）の開閉
    // isResidentOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する
    const openResindentModal = () => {
      setIsResidentOpen(true);
    };

    const closeResidentModal = () => {
      setIsResidentOpen(false);
    };

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
              <button onClick={openResindentModal}>住民申請</button>
              {isResidentOpen && <CreateResidentApplication closeResidentModal={closeResidentModal} />}
              <button onClick={openModal}>メッセージを送る</button>
              {isOpen && <CreateSendingMessage closeModal={closeModal} />}
            </div>
            <Link to= {`/island/edit`}>
              <button id={styles.edit_btn}>編集・削除</button>
            </Link>
        </div>
      </div>    
  );
}
