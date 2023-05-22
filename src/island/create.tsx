import React from "react";



export default function IslandCreate(){
    return(
        <>
       <h1>島情報 編集・削除</h1>
            <div>
                <div>
                    <h3>島名</h3>
                    <input type="text" name="島名" />
                </div>
                <div>
                    <h3>活動内容</h3>
                    <input type="text" name="活動内容" />
                </div>
                <div>
                    <h3>サムネイル</h3>
                    <img src="" alt="サムネイル" />
                </div>
                <div>
                    <h3>ジャンル</h3>
                    <select name="ジャンル">
                        <option>運動</option>
                        <option>文化</option>
                        <option>料理</option>
                    </select>
                </div>
                <button>編集</button>
                <button>削除</button>
            </div>
        </>
    )
}
