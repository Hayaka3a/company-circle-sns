import React, { useEffect } from "react";
import styles from "../styles/menubar.module.css";
import { Link, useParams } from "react-router-dom";

export default function MenubarEvent({ thumbnail }: { thumbnail: string }) {
  const params = useParams();
  const paramsID = parseInt(params.id);

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
          <Link to={`/event/thread/${paramsID}`}>掲示板</Link>
        </div>
        <div>
          <Link to={`/event/post/${paramsID}`}>ポスト</Link>
        </div>
        <div>
          <Link to={`/event/members/${paramsID}`}>参加者一覧</Link>
        </div>
        <div>
          <Link to={`/event/${paramsID}`}>イベント詳細</Link>
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
//          <Link to={`/event/members`}>参加者一覧</Link>
//          </div>
//          <div>
//          <Link to={`/event/[id]`}>イベント詳細</Link>
//          </div>
//     </div>
//     </>

// )
// }
// }
