import { thread } from "../types/thread";
import { useNavigate } from "react-router-dom";
import styles from "../styles/thread.module.css";
import { supabase } from "../createClient";
import { deleteThread } from "./deleteThread";

function Thread({ thread }: { thread: thread[] }) {
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      {thread.map((thread) => (
        <div className={styles.flexDelete} key={thread.id}>
          <div
            className={styles.thread}
            onClick={() => {
              navigate(`/chat/${thread.id}`);
            }}
          >
            <h2 className={styles.title}>{thread.threadTitle}</h2>
          </div>
          <div className={styles.buttonAligin}>
            <button
              onClick={() => deleteThread(thread.id)}
              className={styles.deleteButton}
              data-testid="delete"
            >
              削除
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Thread;
