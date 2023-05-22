import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/island/user_message_post.module.css";

export default function UserMessage(){

    return(
        <>
            <div>
                <Link to={`/island/post`}>
                <img src="/island/close_btn.png" 
                     alt="閉じるボタン" 
                     className={styles.close_btn}
                />
                </Link>
                <p>from:</p>
                <img src="/user/user_icon.png" alt="アイコン"/>                
                <h3>ユーザーネーム</h3>
                <p>受信日時:20XX年XX月XX日</p>
                <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                </p>
            </div>
            <div>
                <Link to={``}>
                    <button>返信する</button>
                </Link>
                <p>to:</p>
                <h3>ユーザーネーム</h3>
                <textarea name="reply" id=""></textarea>
            </div>
        </>
    )
}