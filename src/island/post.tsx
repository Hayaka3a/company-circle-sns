import styles from "../styles/island/island_post.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreateSendingScout from "../components/modalWindows/sendingScout/createSendingScout";
import { useEffect, useState } from "react";
import MenubarIsland from "../components/menubarIsland";
import LogSt from "../components/cookie/logSt";
import { supabase } from "../createClient";
import { format } from "date-fns";
import classNames from "classnames";

export default function IslandPost() {
  LogSt();
  const params = useParams();
  const paramsID = parseInt(params.id);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  //メッセージ受信
  const fetchMsg = async () => {
    // 島ポスト番号を検索
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("status", false)
      .eq("islandID", paramsID);

    if (error) {
      console.error("post情報取得失敗");
    } else {
      const postID = data[0].id;
      // 島ポストに届いているメッセージ検索
      const { data: msgsUnfil, error: msgError } = await supabase
        .from("messages")
        .select("*, applications(*)")
        .eq("postID", postID)
        .eq("status", false);

      // applicationsにデータがある場合は排除（住民許可申請は表示させない）
      let msgs = msgsUnfil.filter(function (ms) {
        return ms.applications.length === 0;
      });

      if (msgError) {
        console.error("msg情報取得失敗");
      } else {
        //msgsのオブジェクトデータごとにpost情報を取得
        const userPromises = msgs.map(async (msg) => {
          const postID = msg.postedBy;

          const { data: by, error: byError } = await supabase
            .from("posts")
            .select("*, users(*)")
            .eq("id", postID)
            .eq("status", false)
            .single();

          if (byError) {
            console.error("送信者取得失敗");
          } else {
            // ユーザーネームとユーザーのポスト情報がついているbyとmsgsを結び付ける
            const userObject = {
              ...msg,
              by: by,
            };
            return userObject;
          }
        });
        // 全てのデータがそろうのを待ってから挿入
        const resolvedUserData = await Promise.all(userPromises);
        setMessages(resolvedUserData);
      }
    }
  };

  useEffect(() => {
    fetchMsg();
  }, []);

  // 既読に変更し、メッセージ全文確認ページへ遷移
  const readHandler = async (messageId) => {
    const { error } = await supabase
      .from("messages")
      .update({ isRead: true })
      .eq("id", messageId);
    if (error) {
      console.error("Failed to update 'isRead' field:", error);
    } else {
      navigate(`/message/${messageId}`);
    }
  };

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
                  onClick={() => readHandler(message.id)}
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
