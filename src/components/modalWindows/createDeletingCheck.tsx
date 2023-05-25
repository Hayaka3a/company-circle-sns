import React from "react";
import styles from "../../styles/createDeletingCheck.module.css";

export default function CreateDeleteCheck({
  closeDeleteCheckModal,
}: {
  closeDeleteCheckModal: () => void;
}) {
  const deleteCheckHandler = () => {};
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.allContents}>
            <img
              src="/modalWindow/close.png"
              alt="×ボタン"
              onClick={closeDeleteCheckModal}
              className={styles.close}
            />
            <div className={styles.main}>
              <div className={styles.title}>
                <h3 className={styles.h3}>本当に島を沈没させてもよろしいですか？</h3>
              </div>
              <div className={styles.flexIcon}>
                <img src= "/island/island_icon.png" 
                     alt="サークルアイコン" 
                />
                <p>〇〇島</p>
              </div>
              <div>
                <p>削除するために下記のテキストボックスに<br /> ”〇〇島”と入力してください</p>
                <input type="text" name="テキストボックス" id={styles.deleteCheck} />
              </div>
            </div>
            <div>
              <button onClick={deleteCheckHandler} className={styles.dCheck_btn}>削除する</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
