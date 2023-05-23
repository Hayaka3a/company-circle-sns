import React, { useEffect } from "react";
import styles from "../styles/menubar.module.css";
import { Link } from "react-router-dom";

export default function MenubarEvent({ thumbnail }: { thumbnail: string }) {
  useEffect(() => {
    let imageUrl = thumbnail;
    let circleElement = document.getElementById("img");

    if (circleElement) {
      circleElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  }, []);

  // ユーザーがイベントに参加してるとき
  // if(){
  return (
    <div className={styles.menubar}>
      <div className={styles.icon} id="img"></div>
      <h4>イベント名</h4>
      <div className={styles.menuContents}>
        <div>
          <Link to={`/event/thread`}>掲示板</Link>
        </div>
        <div>
          <Link to={`/event/post`}>ポスト</Link>
        </div>
        <div>
          <Link to={`/event/menbers`}>参加者一覧</Link>
        </div>
        <div>
          <Link to={`/event/[id]`}>イベント詳細</Link>
        </div>
      </div>
    </div>
  );
}
// ユーザーがイベントに参加してないとき
// else if(){
// return(
//     <>
//     <div className={styles.menubar}>
//     <div className={styles.icon} id='img'></div>
//      <h4>イベント名</h4>
//          <div>
//          <Link to={`/event/menbers`}>参加者一覧</Link>
//          </div>
//          <div>
//          <Link to={`/event/[id]`}>イベント詳細</Link>
//          </div>
//     </div>
//     </>

// )
// }
// }
