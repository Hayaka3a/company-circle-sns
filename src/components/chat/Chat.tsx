import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import styles from "../../styles/Chat.module.css";
import { chat } from "../../types/chat";
import SendMessages from "./SendMessages";
import GetCookieID from "../cookie/getCookieId";
import { handleSaveClick } from "./handleSaveClick";
import { fetchThreadUser } from "./fetchThreadUser";

const Chat = () => {
  const [threadTitle, setThreadTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [nameError, setNameError] = useState("");

  const [user, setUser] = useState<UserData | undefined>(undefined);
  const { id } = useParams();
  const threadID = Number(id);

  const userID = GetCookieID();

  interface UserData {
    familyName: string;
    firstName: string;
    icon: string;
  }

  useEffect(() => {
    fetchThreadUser({
      id,
      setThreadTitle,
      userID,
      setUser,
    });
  }, []);

  const userName = `${user?.familyName}${user?.firstName}`;

  const [messages, setMessages] = useState<chat[]>([]);

  //ひとつ前のページに戻る
  const navi = useNavigate();
  const pageBack = () => {
    navi(-1);
  };

  useEffect(() => {
    // firestore
    //   .collection("chats")
    //   .where("threadID", "==", threadID)
    //   .orderBy("postedAt", "desc")
    //   .limit(20)
    //   .onSnapshot((snapShot) => {
    //     const snapShots = snapShot.docs.map((doc) => {
    //       // データを追加した直後はpostedAtがnullになるため仮のtimeStampを仮置きするオプション
    //       let data = doc.data({ serverTimestamps: "estimate" });
    //       data = { ...data, chatID: doc.id };
    //       // timeStampをDate型に変換
    //       const tmp = {
    //         ...data,
    //         postedAt: data.postedAt.toDate(),
    //       };
    //       // Date型をyy/mm/dd hh:mmの形に変換
    //       return {
    //         ...tmp,
    //         postedAt: tmp.postedAt.toLocaleString([], {
    //           year: "2-digit",
    //           month: "2-digit",
    //           day: "2-digit",
    //           hour: "2-digit",
    //           minute: "2-digit",
    //         }),
    //       };
    //     });
    //     setMessages(snapShots as chat[]);
    //   });
  }, []);

  const handleNameBlur = async () => {
    if (newTitle.trim() === "") {
      setNameError("※スレッド名は1文字から入力可能です");
    } else {
      setNameError("");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setNewTitle(threadTitle);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewTitle("");
  };

  const handleSave = () => {
    handleSaveClick({
      newTitle,
      id,
      setThreadTitle,
      setIsEditing,
    });
  };

  return (
    <main className={styles.content}>
      <div className={styles.titleWrapper}>
        {isEditing ? (
          <div className={styles.flex}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleNameBlur}
              className={styles.editInput}
              data-testid="edit-input"
            />
            {setNameError && (
              <div>
                <span className={styles.span}>{nameError}</span>
              </div>
            )}
            <button
              onClick={handleSave}
              className={`${styles.editButtonA}${nameError && styles.disabled}`}
              disabled={nameError ? true : false}
            >
              保存
            </button>
            <button onClick={handleCancelClick} className={styles.editButtonB}>
              ✖
            </button>
          </div>
        ) : (
          <div className={styles.flex}>
            <a onClick={pageBack} className={styles.link}>
              <p>＜</p>
            </a>
            <p className={styles.title}>{threadTitle}</p>
            <button
              onClick={handleEditClick}
              className={styles.editButton}
              data-testid="editButton"
            >
              編集
            </button>
          </div>
        )}
      </div>
      {messages.map((chat: chat) => (
        <div className={styles.msgs} key={chat.chatID}>
          <div>
            <p
              className={`${styles.userInfo} ${
                chat.postedBy === userName
                  ? `${styles.sentUser}`
                  : `${styles.receivedUser}`
              }`}
            >
              {chat.postedBy}
            </p>
            <div
              key={chat.postedBy}
              className={`${styles.msg} ${
                chat.postedBy === userName
                  ? `${styles.sent}`
                  : `${styles.received}`
              }`}
            >
              <img
                src={chat.icon}
                alt="ユーザーアイコン"
                className={styles.icon}
              />
              <p className={styles.text}>{chat.text}</p>
            </div>
          </div>
          <p
            className={`${styles.userInfo} ${
              chat.postedBy === userName
                ? `${styles.sentUser}`
                : `${styles.receivedUser}`
            }`}
          >
            {chat.postedAt}
          </p>
        </div>
      ))}
      <SendMessages threadID={threadID} />
    </main>
  );
};

export default Chat;
