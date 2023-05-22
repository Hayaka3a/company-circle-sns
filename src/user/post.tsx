import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/user/user_post.module.css";


export default function UserPost(){

    return(
        <>
        <div className={styles.userPostBack}>
            <h1>POST</h1>
                <div className={styles.postMessageBack}>
                    <h2>受け取ったメッセージ</h2>
                    <div className={styles.message}>     
                        <div className={styles.flex}>
                            <img src="/island/island_icon.png" 
                                 alt="島アイコン" 
                            />
                            <div className={styles.right}>
                                <p className={styles.name}> 〇〇島</p>
                                <p>テキストテキストテキストテキストテキストテキスト...</p>  
                            </div>
                        </div>
                        <Link to={`/user/message/island_message`}>
                            <button>表示</button>
                        </Link>
                    </div>
                    <div className={styles.message}>
                        <div className={styles.flex}>
                            <img src="/island/island_icon.png" 
                                 alt="島アイコン" 
                            />
                            <div className={styles.right}>
                                <p className={styles.name}>〇〇島</p> 
                                <p>テキストテキストテキストテキストテキストテキスト...</p>
                            </div>
                        </div>
                        <Link to={`/user/message/scout_message`}>
                            <button>表示</button>
                        </Link>
                    </div>
                    <div className={styles.message}>
                        <div className={styles.flex}>
                            <img src="/operation_icon.png" 
                                 alt="お知らせアイコン" 
                            />
                            <div className={styles.right}>
                                <p className={styles.name}>運営</p>
                                <p>テキストテキストテキストテキストテキストテキスト...</p>      
                            </div>
                        </div>
                        <Link to={`/user/message/operation_message`}>
                            <button>表示</button>
                        </Link>
                    </div>
                </div>
        </div>
        </>
    )
}
