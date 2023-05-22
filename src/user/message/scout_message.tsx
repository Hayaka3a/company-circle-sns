import React from "react";
import { Link } from "react-router-dom";

export default function ScoutMessage(){

    return(
        <>
            <div>               
                <Link to={`/user/post`}>
                <img src="/island/close_btn.png" alt="閉じるボタン" />
                </Link>
                <p>from:</p>
                <img src="/island/island_icon.png" alt="島アイコン" />
                <h3>〇〇島</h3>
                <p>受信日時:20XX年XX月XX日</p>
                <p>〇〇島からスカウトが届きました！</p>
                <button>参加する</button>
                <button>拒否する</button><br />
                <Link to={``}>〇〇島を見に行く</Link>
                {/* <p>回答しました</p> */}
            </div>
        </>
    )
}