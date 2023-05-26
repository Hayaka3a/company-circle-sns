import styles from "../../styles/createSendingScout.module.css";
import ComboBox from "../comboBox";

export default function CreateSendingScout({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const addHandler = () => {};
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.allContents}>
            <img
              src="/modalWindow/close.png"
              alt="×ボタン"
              onClick={closeModal}
              className={styles.close}
            />
            <h3 className={styles.title}>○○島へ招待する</h3>
            <div className={styles.input}>
              <div>
                <label htmlFor="sendUser" className="label">
                  送るユーザー
                </label>
                <ComboBox
                  Options={["あい", "あう", "あえ"]}
                  htmlFor="senduser"
                />
              </div>
              <div className={styles.box}>
                <label htmlFor="text" className="label">
                  コメント
                </label>
                <textarea name="text" className={styles.textSending}></textarea>
              </div>
            </div>
            <div className={styles.btn}>
              <button onClick={addHandler}>送信する</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
