import React from "react";
import Menubar from "../components/menubarIsland";
import MenubarIsland from "../components/menubarIsland";
import styles from "../styles/island/islandDetail.module.css";

export default function IslandDetail() {
  return (
      <div className={styles.flex}>
        <MenubarIsland thumbnail="/login/loginCounter.png" />
        <div className={styles.island_detail}>
          <img src="/island/island_icon.png" alt="サークルアイコン" />
            <h2>〇〇島</h2>
            <p>
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
            </p>

            <div className={styles.btn}>
              <button>住民申請</button>
              <button>メッセージを送る</button>
            </div>
            <button id={styles.edit_btn}>編集・削除</button>
        </div>
      </div>    
  );
}
