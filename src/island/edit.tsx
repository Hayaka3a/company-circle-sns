import React, { useState, useEffect} from "react";
import styles from "../styles/islandEdit.module.css";
import ComboBox from "../components/comboBox";
import CreateDeletePage from "../components/modalWindows/createDeletePage";
import { createClient } from '@supabase/supabase-js';


export default function IslandEdit(){
    const [imageUrl, setImageUrl] = useState("/login/loginCounter.png");
    const [isDeleteOpen, setIsDeleteOpen ] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [islandName, setIslandName] = useState("");
    const [detail, setDetail] = useState("");
    const supabase = createClient('https://tfydnlbfauusrsxxhaps.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmeWRubGJmYXV1c3JzeHhoYXBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDgxMTM4MiwiZXhwIjoyMDAwMzg3MzgyfQ.kXlp09e0gbqjop4NoDxPCWExRXp6XuoNtl8VqC0Ckj8');

    // 削除を押した際の小窓画面（モーダルウィンドウ）の開閉
    // isDeleteOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する
    const openDeleteModal = () => {
        setIsDeleteOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
    };

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const { data, error } = await supabase
            .from('islands')
            .select('*');
    
          if (error) {
            console.error('Error fetching data:', error);
          } else {
            setIslands(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const handleSaveClick = async () => {
        try {
      
          // データをプッシュ（保存）する
          const { data, error } = await supabase
            .from('islands')
            .insert([
              { islandName, detail }
            ]);
      
          if (error) {
            console.error('Error saving data:', error);
          } else {
            console.log('Data saved successfully:', data);
          }
        } catch (error) {
          console.error('Error:', error);
        }

        // 編集モードの切り替え
        setEditMode(!editMode);
    };

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
                    <input
                        type="text"
                        id="islandName"
                        className={styles.inputA}
                        readOnly={!editMode} // 編集モードでない場合は読み取り専用
                    />                
                </div>

                <div className={styles.detail}>
                    <label htmlFor="detail" className={styles.detail}>活動内容</label>
                    <input
                        type="text"
                        id="detail"
                        className={styles.inputA}
                        readOnly={!editMode} // 編集モードでない場合は読み取り専用
                    />                
                </div>

                <div className={styles.box}>
                    <p className={styles.icon} 
                       id="img"
                       style={{ backgroundImage: `url('${imageUrl}')` }}
                    >
                    </p>
                    <label htmlFor="thumbnail">サムネイル</label>
                    <input
                        type="file"
                        id="thumbnail"
                        className={styles.inputA}
                        onChange={handleFileChange}
                        disabled={!editMode} // 編集モードでない場合は無効化
                    />
                </div><br />

                <div className={styles.tag}>
                    <label htmlFor="tag">タグ</label>
                    <ComboBox 
                        Options={tagOptions} 
                        htmlFor="tag" 
                    /><br />
                </div>

                <div>
                    <label htmlFor="addTag">タグ追加</label>
                    <input type="text" id="addTag" className={styles.inputA} />
                    <button onClick={addHandler} className={styles.plus_btn}>追加</button>
                </div>
                <button className={styles.edit_btn} onClick={handleSaveClick}>
                    {editMode ? "保存" : "編集"}
                </button>                
                <button onClick={openDeleteModal} id={styles.delete_btn}>削除</button>
                    {isDeleteOpen && <CreateDeletePage closeDeleteModal={closeDeleteModal} />}
            </div>
       </div>
    )
}
function setIslands(data: { [x: string]: any; }[]) {
    throw new Error("Function not implemented.");
}

