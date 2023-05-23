import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../styles/islandEdit.module.css";
import ComboBox from "../components/comboBox";


export default function IslandEdit(){
    const [imageUrl, setImageUrl] = useState("/login/loginCounter.png");

    // データベースのデータを取ってくる
    const tagOptions = ["サッカー", "大人数", "野外", "野球"];

    // CSS部分で画像URLを変更（imgタグ以外で挿入すれば、円形にしても画像が収縮表示されない）
    useEffect(() => {
        let circleElement = document.getElementById("img");
        if (circleElement) {
        circleElement.style.backgroundImage = `url('${imageUrl}')`;
        }
    }, [imageUrl]);

   // 画像ファイル選択したら、表示画像に反映
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
   };

    // タグ追加
    const addHandler = () => {};


    return(
        <div className={styles.back}>
            <h1 className={styles.name}>島情報編集・削除</h1>
            <div className={styles.inputs}>
                <div className={styles.islandName}>
                    <label htmlFor="islandName">島名</label>
                    <input type="text" id="islandName" className={styles.inputA} />
                </div>

                <div className={styles.detail}>
                    <label htmlFor="detail" className={styles.detail}>活動内容</label>
                    <input type="text" id="detail" className={styles.inputA} />
                </div>

                <div className={styles.box}>
                    <p className={styles.icon} id="img"></p>
                    <label htmlFor="thumbnail">サムネイル</label>
                    <input
                    type="file"
                    id="thumbnail"
                    className={styles.inputA}
                    onChange={handleFileChange}
                    />
                </div><br />

                <div className={styles.tag}>
                    <label htmlFor="tag">タグ</label>
                    <ComboBox Options={tagOptions} htmlFor="tag" /><br />
                </div>

                <div>
                    <label htmlFor="addTag">タグ追加</label>
                    <input type="text" id="addTag" className={styles.inputA} />
                    <button onClick={addHandler} className={styles.plus_btn}>追加</button>
                </div>
                <button className={styles.edit_btn}>編集</button>
                <button id={styles.delete_btn}>削除</button>
            </div>
       </div>
    )
}
