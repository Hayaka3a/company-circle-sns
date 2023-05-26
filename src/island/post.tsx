import styles from "../styles/island/island_post.module.css";
import { Link, useParams } from "react-router-dom";
import CreateSendingScout from "../components/modalWindows/createSendingScout";
import { useState } from "react";
import MenubarIsland from "../components/menubarIsland";
export default function IslandPost() {
  const params = useParams();
  const paramsID = parseInt(params.id);

  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <>
      <div className={styles.islandPostBack}>
        <h1>POST</h1>
        <Link to={`/island/post/entryPermit/${paramsID}`}>
          <button>許可待ちの住民申請</button>
        </Link>
        <button onClick={openModal}>島に招待する</button>
        {modal && <CreateSendingScout closeModal={closeModal} table="island" />}
        <div className={styles.postMessageBack}>
          <h2>受け取ったメッセージ</h2>
          <div className={styles.message}>
            <div className={styles.flex}>
              <img src="/user/user_icon.png" alt="アイコン" />
              <div className={styles.right}>
                <p className={styles.username}>ユーザーネーム</p>
                <p>テキストテキストテキストテキストテキストテキスト...</p>
              </div>
            </div>
            <Link to={`/island/message/user_message`}>
              <button>表示</button>
            </Link>
          </div>
          <div className={styles.message}>
            <div className={styles.flex}>
              <img src="/user/user_icon.png" alt="アイコン" />
              <div className={styles.right}>
                <p className={styles.username}>ユーザーネーム</p>
                <p>テキストテキストテキストテキストテキストテキスト...</p>
              </div>
            </div>
            <Link to={`/island/message/user_message`}>
              <button>表示</button>
            </Link>
          </div>
          <div className={styles.message}>
            <div className={styles.flex}>
              <img src="/user/user_icon.png" alt="アイコン" />
              <div className={styles.right}>
                <p className={styles.username}>ユーザーネーム</p>
                <p>テキストテキストテキストテキストテキストテキスト...</p>
              </div>
            </div>
            <Link to={`/island/message/user_message`}>
              <button>表示</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
