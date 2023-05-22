import React from "react";
import { Link } from "react-router-dom";

export default function OperationMessage(){

    return(
        <>
            <div>
                <Link to={`/user/post`}>
                <img src="/island/close_btn.png" alt="閉じるボタン" />
                </Link>
                <p>from:</p>
                <img src="/operation_icon.png" alt="お知らせアイコン" />
                <h3>お知らせ</h3>
                <p>受信日時:20XX年XX月XX日</p>
                <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br />
                </p>
            </div>
        </>
    )
}