import React from "react"
import Menubar from "../components/menubarIsland"
import styles from '../styles/login.module.css'


export default function Login(){

    const loginHandler =()=>{

    }
    return(
        <div className={styles.all}>
        <div className={styles.main}>
            <div>
                <img src='/public/login/loginCounter.png' alt='Login Counter'/>
            <div className={styles.board}>
            <div>
            <label htmlFor='email' className={styles.label}>メールアドレス：</label>
            <input type="email" id='email'/>
            </div>

            <div>
            <label htmlFor='pass' className={styles.label}>パスワード：</label>
            <input type="password" id='pass'/>
            </div>
            </div>

            </div>


            <button onClick={loginHandler}>ログイン</button>
        </div>
        </div>
    )
}
