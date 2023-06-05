import React, { useState } from "react";
import styles from "../../styles/createDeletingCheck.module.css";
import { supabase } from "../../createClient";
import { useParams } from "react-router-dom";


export default function CreateDeleteCheck({
  close2Modal,
  nextOpen2,
  inputValue,
  setInputValue,
}: {
  close2Modal: () => void;
  nextOpen2: () => void;
  inputValue: string
  // React.Dispatch<>は、<>の値を引数として受け取る
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  
  const [emptyChara, setEmptyChara] = useState("");
  const [notExist, setNotExist] = useState("");

  // パスの最後のIDを取得する
  const { id } = useParams();

  const nextHandler = async () => {
    if (inputValue) {
      // IDに対応する島の情報を取得する
      const { data, error } = await supabase
        .from("islands")
        .select("islandName")
        .eq("id", id);
  
      if (error) {
        // エラーハンドリング
        console.error(error);
        return;
      }
  
      if (data && data.length > 0) {
        const islandName = data[0].islandName;
  
        if (islandName !== inputValue) {
          setNotExist("入力された島名が間違っています");
        } else {
          nextOpen2();
        }
      }
    }
  };

  const handleInputChange = async (event) => {
    const value = event.target.value;
    if (/\s/.test(value)) {
      // 空白文字（\s）を入れようとした場合、エラーメッセージを表示
      setEmptyChara("空白文字は入力できません");
      setNotExist("");
    } else {
      setInputValue(value);
      setEmptyChara("");
    }
  };

return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.allContents}>
            <img
              src="/modalWindow/close.png"
              alt="×ボタン"
              onClick={close2Modal}
              className={styles.close}
            />
            <div className={styles.main}>
              <div className={styles.title}>
                <h3 className={styles.h3}>本当に島を沈没させてもよろしいですか？</h3>
              </div>
              <div>
                <p>削除するために下記のテキストボックスに<br /> 島名を入力してください</p>
                <p>※スペースを入れずに入力してください</p>
              </div>
              <input 
                type="text" 
                id={styles.deleteCheck} 
                value={inputValue}
                onChange={handleInputChange}
              />

              {emptyChara && (
                <div>
                  <span>{emptyChara}</span>
                </div>
              )}
              {notExist && (
                <div>
                  <span>{notExist}</span>
                </div>
              )}
            </div>
            <div>
              <button onClick={nextHandler} id={styles.delete_btn} disabled={!inputValue.trim()}>削除する</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
