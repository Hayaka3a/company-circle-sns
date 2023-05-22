import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/user/scout_message_post.module.css";

export default function ScoutMessage(){

    return(
        <div className={styles.back}>              
                <Link to={`/user/post`}>
                <img src="/island/close_btn.png" 
                     alt="閉じるボタン" 
                     className={styles.close_btn}
                />
                </Link>
                <div className={styles.receive}>
                    <div className={styles.flex}>
                        <p className={styles.from}>from:</p>
                        <img src="/island/island_icon.png" 
                             alt="島アイコン" 
                        />
                        <h3 className={styles.islandName}>〇〇島</h3>
                        <p className={styles.receiving_time}>受信日時:20XX年XX月XX日</p>
                    </div>
                    <div className={styles.scoutMessage}>
                        <p>〇〇島からスカウトが届きました！</p>
                        <button>参加する</button>
                        <button>拒否する</button><br />
                        <div className={styles.island_detail}>
                            <Link to={``}>〇〇島を見に行く</Link>
                        </div>
                        {/* <p>回答しました</p> */}
                    </div>
                </div>
        </div>
    )
}