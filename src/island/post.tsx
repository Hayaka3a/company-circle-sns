import styles from "../styles/island/island_post.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreateSendingScout from "../components/modalWindows/sendingScout/createSendingScout";
import { useEffect, useState } from "react";
import MenubarIsland from "../components/menubar/menubarIsland/menubarIsland";
import LogSt from "../components/cookie/logSt";

import { format } from "date-fns";
import classNames from "classnames";
import { fetchMsg } from "../components/post/fetchMsg";
import { readHandler } from "../components/post/readHandler";

export default function IslandPost() {
  LogSt();
  const params = useParams();
  const paramsID = parseInt(params.id);
  const [messages, setMessages] = useState([]);

  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const navigate = useNavigate();

  //メッセージ受信
  useEffect(() => {
    fetchMsg({ paramsID, setMessages });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.all}>
      <MenubarIsland />
      <div className={styles.islandPostBack}>
        <h2 className={styles.h1}>POST</h2>
        <Link to={`/island/post/entryPermit/${paramsID}`}>
          <button className={styles.btn2}>住民許可待ち申請</button>
        </Link>
        <button onClick={openModal} className={styles.btn1}>
          島に招待する
        </button>
        {modal && <CreateSendingScout closeModal={closeModal} table="island" />}
        <div className={styles.postMessageBack}>
          <h2>受信メッセージ✉️</h2>
          {messages.length === 0 ? (
            <p>受信メッセージはありません</p>
          ) : (
            messages.map((message) => (
              <div className={styles.message} key={message.id}>
                <div className={styles.flex}>
                  <img
                    src={
                      message.by.users.icon ||
                      "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-08T07%3A12%3A33.854Z"
                    }
                    alt="アイコン"
                  />
                  <div className={styles.right}>
                    <div className={styles.upper}>
                      <h3
                        className={classNames(styles.username, {
                          [styles.unread]: !message.isRead,
                        })}
                      >
                        {message.isRead === false && (
                          <div className={styles.unreadCircle}>未読</div>
                        )}
                        {message.by.users.familyName}&nbsp;
                        {message.by.users.firstName}
                      </h3>
                      <p className={styles.date}>
                        {format(
                          new Date(message.sendingDate),
                          "yyyy年MM月dd日",
                        )}
                      </p>
                    </div>
                    <p
                      className={classNames(styles.mss1, {
                        [styles.unread]: !message.isRead,
                      })}
                    >
                      {message.message.substring(0, 80)}...
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => readHandler(message.id, navigate)}
                  className={styles.displayButton}
                >
                  表示
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
