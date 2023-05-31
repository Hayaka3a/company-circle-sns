import styles from "../../styles/modalWindows/quit.module.css";

export default function QuitDone({ done }: { done: () => void }) {
  // 現在のウィンドウを閉じ、新規登録画面へ遷移する
  const deleteHandler = () => {
    done();
  };
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.allContents}>
            <div className={styles.main}>
              <div className={styles.title}>アカウントを削除が完了しました</div>
            </div>
            <div>
              <button onClick={deleteHandler}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
