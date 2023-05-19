import React, { useEffect } from "react";
import styles from '../styles/menubar.module.css'
import { Link } from "react-router-dom";


export default function MenubarEvent(thumbnail: any) {

    useEffect(() => {
        let imageUrl = "/login/loginCounter.png";
        let circleElement = document.getElementById("img");
    
        if (circleElement) {
          circleElement.style.backgroundImage = `url('${imageUrl}')`;
        }
      }, []);
    
    // ユーザーがイベントに参加してるとき
    // if(){
    return(
        <div className={styles.menubar}>
             <div className={styles.icon} id='img'></div>
             <h4>イベント名</h4>
             <div className={styles.menuContents}>
             <div>
             <Link to={`/island/forum`}>掲示板</Link>
             </div>
             <div>
             <Link to={`/event/[id]`}>イベント</Link>
             </div>
             <div>
             <Link to={`/island/post`}>ポスト</Link>
             </div>
             <div>
             <Link to={`/island/menbers`}>島民一覧</Link>
             </div>
             <div>
             <Link to={`/island/[id]`}>島詳細</Link>
             </div>
             </div>
        </div>

    )}
    // ユーザーがイベントに参加してないとき
    // else if(){
        // return(
        //     <>
        //     <div className={styles.menubar}>
        //     <div className={styles.icon} id='img'></div>
        //      <h4>イベント名</h4>
        //          <div>
        //          <Link to={`/event/[id]`}>イベント</Link>
        //          </div>
        //          <div>
        //          <Link to={`/island/menbers`}>島民一覧</Link>
        //          </div>
        //          <div>
        //          <Link to={`/island/[id]`}>島詳細</Link>
        //          </div>
        //     </div>
        //     </>

        // )
    // }
// }
