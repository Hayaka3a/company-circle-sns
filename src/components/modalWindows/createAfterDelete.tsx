import React, { useState } from "react";
import styles from "../../styles/createAfterDelete.module.css";

export default function CreateAfterDelete({done}: {done: () => void}) {
  // 現在のウィンドウを非表示にし、島作成画面（新規サークル作成画面）へ遷移する
  const deleteHandler = () => {
    done();
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.allContents}>
            <div className={styles.main}>
                <h3 className={styles.h3}>島は沈没しました</h3>
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
