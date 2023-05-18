import React from "react";
import styles from '../styles/menubarIsland.module.css'
import { Link } from "react-router-dom";
import UserPost from "../user/post";


export default function MenubarIsland(thumbnail: any) {
    
    // ユーザーがサークルに参加してるとき
    // if(){
    // return(
        // <>
        <div className={styles.menubar}>
            <img src={thumbnail} alt="島アイコン"
             />
             <p>島名もしくはイベント名表示予定</p>
             
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
        // </>
    // )}
    // ユーザーがサークルに参加してないとき
    // else if(){
        return(
            <>
            <div className={styles.menubar}>
                <img src={thumbnail} alt="島アイコン"
                 />
                 <p>島名もしくはイベント名表示予定</p>
                 <div>
                 <Link to={`/event/[id]`}>イベント</Link>
                 </div>
                 <div>
                 <Link to={`/island/menbers`}>島民一覧</Link>
                 </div>
                 <div>
                 <Link to={`/island/[id]`}>島詳細</Link>
                 </div>
            </div>
            </>

        )
    // }
}
