import styles from "../../../styles/createSendingMessage.module.css";
import { deleteHandler } from "./deleteHandler";

export default function DeleteComfirmation({
  closeModal,
  text,
  category,
  table,
  params,
  user,
}: {
  closeModal: () => void;
  text: string;
  category: string;
  table: string;
  params: number | string;
  user: number;
}) {
  //メンバー一覧画面での各ボタン押下後の確認画面

  const clickEvent = () => {
    deleteHandler({
      category,
      user,
      table,
      params,
      closeModal,
    });
  };

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
            <div className={styles.main2}>
              <div className={styles.title}>
                <p className={styles.messageName}>{text}</p>
              </div>
            </div>
            <div>
              <button onClick={clickEvent} className={styles.btn3}>
                はい
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
