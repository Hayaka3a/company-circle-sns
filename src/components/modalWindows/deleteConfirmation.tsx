import styles from "../../styles/createSendingMessage.module.css";
import { supabase } from "../../createClient.js";

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
      const handler = async () => {
        // 自分が脱退する;
        const { data, error } = await supabase
          .from("userEntryStatus")
          .update({ status: true })
          .eq(`userID`, user)
          .eq(`${table}ID`, params);

        if (error) {
          console.error(error.message);
        } else {
          closeModal();
          window.location.reload();
        }
      };
      return (
        <button onClick={handler} className={styles.btn}>
          はい
        </button>
      );
      // return <LeaveButton table={table} params={params} user={user} />;
    } else if (category === "追放") {
      const handler = async () => {
        //メンバーを削除
        const { data, error } = await supabase
          .from("userEntryStatus")
          .update({ status: true })
          .eq(`userID`, user)
          .eq(`${table}ID`, params);
        if (error) {
          console.error(error.message);
        } else {
          closeModal();
          window.location.reload();
        }
      };
      return (
        <button onClick={handler} className={styles.btn}>
          はい
        </button>
      );
    } else if (category === "譲渡") {
      //オーナー権限を譲渡する
      const handler = async () => {
        const { data, error } = await supabase
          .from(`${table}s`)
          .update({ ownerID: user })
          .eq("id", params);

        if (error) {
          console.error(error.message);
        } else {
          closeModal();
          window.location.reload();
        }
      };

      return (
        <button onClick={handler} className={styles.btn}>
          はい
        </button>
      );
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
                <p className={styles.messageName}>{text}</p>
              </div>
            </div>
            <div>{addHandler(category)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
