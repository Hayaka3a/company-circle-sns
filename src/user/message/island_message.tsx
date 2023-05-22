import React from "react";
import { Link } from "react-router-dom";

export default function IslandMessage(){

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