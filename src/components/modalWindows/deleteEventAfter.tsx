import React, { useState } from "react";
import styles from "../../styles/createAfterDelete.module.css";

export default function CreateAfterDelete({done}: {done: () => void}) {
  // 現在のウィンドウを非表示にし、イベント作成画面へ遷移する
  const deleteHandler = () => {
    done();
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.allContents}>
            <div className={styles.main}>
                <h3 className={styles.h3}>イベントを削除しました</h3>
                <div className={styles.delete_btn}>
                  <button className={styles.dCheck_btn} onClick={deleteHandler}>OK</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
