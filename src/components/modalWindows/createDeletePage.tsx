import React from "react";
import styles from "../../styles/createDeletePage.module.css";

export default function CreateDeletePage({
  closeDeleteModal,
}: {
  closeDeleteModal: () => void;
}) {
  const deleteHandler = () => {};
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
              <button onClick={deleteHandler}>島を沈没（削除）させる</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
