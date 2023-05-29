import React, { useState } from "react";
import styles from "../../styles/createDeletePage.module.css";
import CreateDeleteCheck from "./createDeletingCheck";

export default function CreateDeletePage({
  closeDeleteModal,

}: {
  closeDeleteModal: () => void;
}) {

  const [ isDeleteCheckOpen, setIsDeleteCheckOpen ] = useState(false);

  // 島を沈没（削除）させるを押した際の小窓画面（モーダルウィンドウ）の開閉
  // isDeleteCheckOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する
  const openDeleteCheckModal = () => {
      setIsDeleteCheckOpen(true);
  };

  const closeDeleteCheckModal = () => {
      setIsDeleteCheckOpen(false);
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.allContents}>
            <img
              src="/modalWindow/close.png"
              alt="×ボタン"
              onClick={closeDeleteModal}
              className={styles.close}
            />
            <div className={styles.main}>
              <div className={styles.title}>
                <h3 className={styles.h3}>島を沈没させてもよろしいですか？</h3>
              </div>
              <div className={styles.flexIcon}>
                <img src= "/island/island_icon.png" 
                     alt="サークルアイコン" 
                />
                <p>〇〇島</p>
              </div>
            </div>
            <div>
              <button onClick={openDeleteCheckModal} id={styles.delete_btn}>島を沈没（削除）させる</button>
              {isDeleteCheckOpen && <CreateDeleteCheck closeDeleteCheckModal={closeDeleteCheckModal} />}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
