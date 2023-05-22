import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../styles/islandCreate.module.css";
import ComboBox from "../components/comboBox";

export default function IslandCreate() {
  const [imageUrl, setImageUrl] = useState("/login/loginCounter.png");

  // データベースのデータを取ってくる
  const userOptions = ["山田", "山本", "佐藤", "鈴木", "田中"];
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

  // 島作成する
  const createHandler = () => {};

  return (
    <div className={styles.background}>
      <div className={styles.box}>
        <h1>島作成</h1>
        <div className={styles.inputs}>
          <div>
            <label htmlFor="islandName">
              島名<span>【必須】</span>
            </label>
            <input type="text" id="islandName" className={styles.inputA} />
          </div>

          <div>
            <label htmlFor="detail">
              活動内容<span>【必須】</span>
            </label>
            <input type="text" id="detail" className={styles.inputA} />
          </div>

          <div>
            <label htmlFor="user">メンバー</label>
            <div className={styles.displaySide}>
              <ComboBox Options={userOptions} htmlFor="user" />
            </div>
          </div>

          <div>
            <p className={styles.icon} id="img"></p>
            <label htmlFor="thumbnail">サムネイル</label>
            <input
              type="file"
              id="thumbnail"
              className={styles.inputA}
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label htmlFor="tag">タグ</label>
            <ComboBox Options={tagOptions} htmlFor="tag" />
          </div>

          <div>
            <label htmlFor="addTag">タグ追加</label>
            <input type="text" id="addTag" className={styles.inputA} />
            <button onClick={addHandler}>追加</button>
          </div>
          <button onClick={createHandler}>新しい島生活を始める</button>
        </div>
      </div>
    </div>
  );
}
