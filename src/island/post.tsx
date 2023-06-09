import styles from "../styles/island/island_post.module.css";
import { Link, useParams } from "react-router-dom";
import CreateSendingScout from "../components/modalWindows/createSendingScout";
import { useEffect, useState } from "react";
import MenubarIsland from "../components/menubarIsland";
import LogSt from "../components/cookie/logSt";
import { supabase } from "../createClient";

export default function IslandPost() {
  LogSt();
  const params = useParams();
  const paramsID = parseInt(params.id);
  console.log(paramsID);

  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  //メッセージ受信
  const fetchMsg = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("status", "false")
      .eq("isalndID", paramsID);

    if (error) {
      console.error("post情報取得失敗");
    } else {
      const postID = data[0].id;
      const { data: msgs, error: msgError } = await supabase
        .from("messages")
        .select("*")
        .eq("postID", postID);

      if (msgError) {
        console.error("msg情報取得失敗");
      } else {
        if (msgs.length > 0) {
          // 受信しているメッセージがあるときのみ実行
          //msgsのオブジェクトデータごとにpostedByの検索をかける
          const msgArray = msgs.map(async (msg) => {
            const postID = msg.postedBy;
            const { data: by, error: byError } = await supabase
              .from("posts")
              .select("*")
              .eq("id", postID);
            console.log(msgArray);
            if (byError) {
              console.error("送信者取得失敗");
            } else {
              if (by.length > 0) {
                const post = by[0];
                // 送信者がイベントのメッセージ一覧
                if (post.islandID === null && post.userID === null) {
                  //   setEventsMS(msgs);
                  const eventMsg = msgs.filter(
                    (post) => post.islandID === null && post.userID === null,
                  );
                  console.log(eventMsg);
                  // 送信者が島のメッセージ一覧
                } else if (post.eventID === null && post.userID === null) {
                  //   setIslandsMs(msgs);
                  const islandMsg = msgs.filter(
                    (post) => post.eventID === null && post.userID === null,
                  );
                  console.log(islandMsg);
                }
              }
            }
          });
        } else {
          console.log("受信メッセージはありません");
        }
      }
    }
  };

  useEffect(() => {
    fetchMsg();
  }, []);

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
          <h2>受信メッセージ✉️</h2>
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
