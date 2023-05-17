import React from "react";
import styles from './menubar.module.css';


export default function Menubar(thumbnail: any){
    return(
        <>
        <div className={styles.menubar}>
            <img src={thumbnail} alt="島アイコン"
             />
            
        </div>
        
        </>
    )
}
