import styles from "../../styles/createSendingMessage.module.css";
import ExileButton from "../members/ExileButton";
import LeaveButton from "../members/LeaveButton";
import OwnerTransferButton from "../members/OwnerTransferButton";

export default function DeleteComfirmation({
  closeModal,
  text,
  category,
  islandName,
  table,
  params,
  user,
}: {
  closeModal: () => void;
  text: string;
  category: string;
  islandName: string;
  table: string;
  params: number | string;
  user: number;
}) {
  const addHandler = (category: string) => {
    if (category === "脱退する") {
      return (
        <LeaveButton
          table={table}
          params={params}
          user={user}
          close={closeModal}
        />
      );
    } else if (category === "追放") {
      return (
        <ExileButton
          table={table}
          params={params}
          user={user}
          close={closeModal}
        />
      );
    } else if (category === "譲渡") {
      return (
        <OwnerTransferButton
          table={table}
          params={params}
          user={user}
          close={closeModal}
        />
      );
    } else {
      window.alert("ERROR");
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
              onClick={closeModal}
              className={styles.close}
            />
            <div className={styles.main}>
              <div className={styles.title}>
                <h3 className={styles.h3}>{islandName}島</h3>
                <p className={styles.messageName}>{text}</p>
              </div>
            </div>
            <div className={styles.btn}>{addHandler(category)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
