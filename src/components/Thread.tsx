import React, { useEffect, useState } from "react";
import { thread } from "../types/thread";
import { useNavigate } from "react-router-dom";
import styles from "../styles/thread.module.css";
import { changeFormat } from "../common/changeFormat";

function Thread({ thread }: { thread: thread[] }) {
  const [threads, setThreads] = useState<thread[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // startDateとendDateをyyyy年mm月dd日に変換
    const modiDateThread = thread.map((thread) => {
      thread = {
        ...thread,
        events: thread.events && {
          ...thread.events,
          startDate: changeFormat(thread.events.startDate),
          endDate: changeFormat(thread.events.endDate),
        },
      };
      return thread;
    });
    setThreads(modiDateThread);
  }, [thread]);

  return (
    <div className={styles.content}>
      {threads.map((thread) => (
        <div
          key={thread.id}
          onClick={() => {
            navigate(`/chat/${thread.id}`);
          }}
          className={styles.thread}
        >
          <div className={styles.imgWrapper}>
            <img src={thread.events?.thumbnail} alt="アイコン" />
          </div>
          <p className={styles.title}>{thread.threadTitle}</p>
          {thread.events && (
            <p>{`${thread.events.startDate}~${thread.events.endDate}`}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Thread;
