import React from "react";
import { thread } from "../types/thread";
import { useNavigate } from "react-router-dom";
import styles from "../styles/thread.module.css";
import { supabase } from "../createClient";

function Thread({ thread }: { thread: thread[] }) {
  const navigate = useNavigate();

  // スレッド削除
  const deleteThread = async (threadId) => {
    try {
      const { error } = await supabase
        .from("threads")
        .update({ status: true })
        .eq("id", threadId);

      if (error) {
        console.error("Error updating thread:", error);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating thread:", error);
    }
  };

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
