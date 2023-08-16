import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "./createClient";
import { format } from "date-fns";
import { useCookies } from "react-cookie";
import LogSt from "./components/cookie/logSt";
import styles from "../src/styles/message.module.css";
import ScoutPostEvent from "./components/scoutPostEvent";
import ScoutPostIsland from "./components/scoutPostIsland";
import FetchUserMessages from "./components/fetchUserMessages";
import markMessageAsRead from "./components/markMessageAsRead";

export default function Message() {
  LogSt();

  const { id } = useParams();

  const cookies = useCookies(["id"]);
  const userCookie = cookies[0].id;

  const [userMessages, setUserMessages] = useState([]);
  const [sender, setSender] = useState([]);
  const [posts, setPosts] = useState([]);
  const [imageUrl] = useState("");
  const [showTextArea, setShowTextArea] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [, setScoutEvent] = useState([]);
  const [, setScoutIsland] = useState([]);

  const navi = useNavigate();

  //ひとつ前のページに戻る
  const pageBack = () => {
    navi(-1);
  };

  useEffect(() => {
    fetchUserMessagesData();
  }, []);

  const fetchUserMessagesData = async () => {
    await FetchUserMessages(id, setUserMessages, fetchPosts);
  };

  useEffect(() => {
    let circleElement = document.getElementById("img");
    if (circleElement) {
      circleElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  }, [imageUrl]);


  const fetchPosts = async (messagesPosteBy) => {    
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("id, userID, islandID, eventID")
      .in("id", messagesPosteBy);

    if (postsError) {
      console.log("postsの取得エラー", postsError);
      return;
    }

    if (posts) {
      setPosts(posts);

      const userIds = [];
      const eventIds = [];
      const islandIds = [];

      // ユーザーID、イベントID、アイランドIDに基づいて送信者を分類
      posts.forEach((post) => {
        if (post.userID) {
          userIds.push(post.userID);
        }
        if (post.eventID) {
          eventIds.push(post.eventID);
        }
        if (post.islandID) {
          islandIds.push(post.islandID);
        }
      });

      fetchUsers(userIds);
      fetchEvents(eventIds);
      fetchIslands(islandIds);
    }
  };

  const fetchUsers = async (userIds) => {
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .in("id", userIds);

    if (usersError) {
      console.log("usersの取得エラー", usersError);
      return;
    }

    if (users) {
      setSender((prevSender) => [...prevSender, ...users]);
    }
  };

  const fetchEvents = async (eventIds) => {
    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select("*")
      .in("id", eventIds);

    if (eventsError) {
      console.log("eventsの取得エラー", eventsError);
      return;
    }

    if (events && events.length > 0) {
      setSender((prevSender) => [...prevSender, ...events]);
      const scoutValues = events.map((event) => event.scout);
      setScoutEvent(scoutValues.includes(true) ? [true] : []);
    }
  };

  const fetchIslands = async (islandIds) => {
    const { data: islands, error: islandsError } = await supabase
      .from("islands")
      .select("*")
      .in("id", islandIds);

    if (islandsError) {
      console.log("islandsの取得エラー", islandsError);
      return;
    }

    if (islands && islands.length > 0) {
      setSender((prevSender) => [...prevSender, ...islands]);
      const scoutValues = islands.map((island) => island.scout);
      setScoutIsland(scoutValues.includes(true) ? [true] : []);
    }
  };

  const openTextArea = () => {
    setShowTextArea(true);
  };

  const handleSendMessage = async () => {
    const messageInput = document.getElementById(
      "message-text",
    ) as HTMLInputElement;
    const messageText = messageInput.value.trim();
    
    // メッセージが送信された後に画面をリロードする
    setTimeout(() => {
      window.location.reload();
    }, 3000);

    if (messageText === "") {
      setErrorMessage("メッセージを入力してください。");
      return;
    }

    const maxMessageLength = 200; //文字数の上限を200文字に設定

    if (messageText.length > maxMessageLength) {
      setErrorMessage(`メッセージは${maxMessageLength}文字以内で入力してください。`);
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("userID", userCookie)
      .single();

    if (error) {
      console.error("エラー:", error);
      return;
    }

    const userId = data?.id;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const { error: messageError } = await supabase.from("messages").insert([
      {
        postID: userMessages[0].postedBy,
        message: messageText,
        scout: false,
        isRead: false,
        isAnswered: false,
        postedBy: userMessages[0].postID,
        status: false,
        sendingDate: formattedDate,
      },
    ]);

    console.log(posts[0].id)

    if (messageError) {
      console.error("メッセージの送信中にエラーが発生しました:", error);
      return;
    }

    console.log("データが正常に送信されました");

    messageInput.value = "";
    setShowTextArea(false);
  };

  useEffect(() => {
    if (errorMessage) {      
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    markMessageAsRead(id);
  }, [id]);

  return (
    <div className={styles.back}>
      <div className={styles.btnArea}>
        <button onClick={pageBack}>
          <img
            src="/island/close_btn.png"
            alt="閉じるボタン"
            className={styles.close_btn}
          />
        </button>
      </div>
      <div className={styles.receive}>
        <div className={styles.messageArea}>
          {userMessages.map((message) => {
            const post = posts.find((post) => post.id === message.postedBy);
            const user = sender.find((user) => user.id === post?.userID);
            const event = sender.find((event) => event.id === post?.eventID);
            const island = sender.find(
              (island) => island.id === post?.islandID,
            );
            return (
              <div key={message.id}>
                <div className={styles.flexBetween}>
                  {user && (
                    <div className={styles.flex}>
                      <p className={styles.from}>from:</p>
                      <img
                        className={styles.img}
                        id="img"
                        src={
                          user.thumbnail ||
                          "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351"
                        }
                        alt="user Thumbnail"
                      />
                      <h3 className={styles.userName}>
                        {user.familyName}
                        {user.firstName}
                      </h3>
                    </div>
                  )}
                  {event && (
                    <div className={styles.flex}>
                      <p className={styles.from}>from:</p>
                      <img
                        className={styles.img}
                        id="img"
                        src={
                          event.thumbnail ||
                          "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351"
                        }
                        alt="event Thumbnail"
                      />
                      <h3 className={styles.userName}>{event.eventName}</h3>
                    </div>
                  )}
                  {island && (
                    <div className={styles.flex}>
                      <p className={styles.from}>from:</p>
                      <img
                        className={styles.img}
                        id="img"
                        src={
                          island.thumbnail ||
                          "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351"
                        }
                        alt="island Thumbnail"
                      />
                      <h3 className={styles.userName}>{island.islandName}</h3>
                    </div>
                  )}
                  <p className={styles.receiving_time}>
                    受信日時：
                    {format(
                      new Date(message.sendingDate),
                      "yyyy年MM月dd日 HH:mm",
                    )}
                  </p>
                </div>
                {message.scout && post?.eventID ? (
                  <ScoutPostEvent table={"event"} />
                ) : message.scout && post?.islandID ? (
                  <ScoutPostIsland table={"island"} />
                ) : (
                  <p className={styles.text_body}>{message.message}</p>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.text}>
          {!showTextArea && !userMessages.some((message) => message.scout) && (
            <button onClick={openTextArea} className={styles.btn}>
              返信する
            </button>
          )}
          {showTextArea && (
            <div>
              <div className={styles.sendBtn}>
                <button onClick={handleSendMessage} className={styles.btn}>
                  送信
                </button>
              </div>
              <br />
              {errorMessage && <p className={styles.error}>{errorMessage}</p>}
              <textarea
                className={styles.textArea}
                id="message-text"
                placeholder="返信メッセージを入力してください"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
