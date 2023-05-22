import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/user/operation_message_post.module.css";

export default function OperationMessage(){

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
                        <img src="/operation_icon.png" 
                             alt="お知らせアイコン" 
                        />
                        <h3 className={styles.operation}>お知らせ</h3>
                        <p className={styles.receiving_time}>受信日時:20XX年XX月XX日</p>
                    </div>
                    <p className={styles.text_body}>
                    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                    </p>
                </div>
        </div>
    )
}