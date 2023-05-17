import React from "react";
import styles from '../styles/menubar.module.css'
import { Link } from "react-router-dom";


export default function Menubar(thumbnail: any) {
    return(
        <>
        <div className={styles.menubar}>
            <img src={thumbnail} alt="島アイコン"
             />
             <p>島名もしくはイベント名表示予定</p>
             <div>
             <Link to={`/island/[id]`}>島詳細</Link>
             </div>
             <div>
             <Link to={`/event/[id]`}>イベント</Link>
             </div>
        </div>
       
       
     
        
        </>
    )
}
