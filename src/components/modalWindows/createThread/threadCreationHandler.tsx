// スレッド作成送信
import { useEffect, useState } from "react";
import { supabase } from "../../../createClient";
import styles from "../../../styles/createThread.module.css";

export default function ThreadCreationHandler({
  threadTitle,
  islandID,
  eventID,
  closeModal,
  onThreadCreated,
}: {
  threadTitle: string;
  islandID: number | null;
  eventID: number | null;
  closeModal: () => void;
  onThreadCreated: () => void;
}) {
  const [isThreadTitleEmpty, setIsThreadTitleEmpty] = useState(true);

  // 入力されていないとtrueのままでボタンを非活性に
  useEffect(() => {
    setIsThreadTitleEmpty(threadTitle.trim().length === 0);
  }, [threadTitle]);

  const addHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { error } = await supabase
      .from("threads")
      .insert({ threadTitle, islandID, eventID, status: false });

    if (error) {
      console.error("Failed to create thread:", error.message);
    } else {
      console.log("スレッド作成成功");
      closeModal();
      onThreadCreated(); // 新しいスレッドが作成されたことを親コンポーネントに通知する
    }
  };

  return (
    <button
      onClick={addHandler}
      disabled={isThreadTitleEmpty}
      className={styles.btn}
    >
      作成
    </button>
  );
}
