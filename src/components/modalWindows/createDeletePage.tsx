import styles from "../../styles/createThread.module.css";

// closeDeleteModalは×ボタンを押下したときの関数、nextOpenは完了系ボタン（島を沈没（削除）させる）を押したときの関数
export default function CreateDeletePage({
  closeDeleteModal,
  nextOpen,
}: {
  closeDeleteModal: () => void;
  nextOpen: () => void;
}) {
  // 現在のウィンドウを非表示にし、入力ボックスウィンドウを表示する
  const nextHandler = () => {
    nextOpen();
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
            </div>
            <div>
              <button onClick={nextHandler} id={styles.delete_btn}>
                島を沈没（削除）させる
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
