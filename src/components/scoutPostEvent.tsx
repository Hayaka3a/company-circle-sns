import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import styles from "../styles/message.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import LogSt from "./cookie/logSt";
import { useCookies } from "react-cookie";
import { log } from "console";

export default function ScoutPostEvent({ table }: { table: string }) {
  LogSt();

  // メッセージの型定義
  interface Message {
    id: number;
    postedBy: number;
  }
  

  const params = useParams();
  const paramsID = parseInt(params.id);

  const [cookies] = useCookies(["id"]);
  const id = cookies.id;

  const [eventName, setEventName] = useState("");
  const [event, setEvent] = useState<any>(null)
  const [isButtonsVisible, setIsButtonsVisible] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
        // messages テーブルから該当のデータを取得
        const { data: message, error: messagesError } = await supabase
          .from("messages")
          .select("*")
          .eq("id", paramsID)
          .single();

        if (messagesError) {
          console.error("メッセージの取得エラー", messagesError);
          return;
        }

        // posts テーブルから該当のデータを取得
        const { data: post, error: postsError } = await supabase
          .from("posts")
          .select("*")
          .eq("id", message.postedBy)
          .single();

        if (postsError) {
          console.error("ポストの取得エラー", postsError);
          return;
        }

        // events テーブルから該当のデータを取得
        const { data: event, error: eventsError } = await supabase
          .from("events")
          .select("eventName, id")
          .eq("id", post.eventID)
          .single();

        if (eventsError) {
          console.error("イベント情報の取得エラー", eventsError);
          return;
        }

        // イベント名を設定
        setEventName(event.eventName);
        setEvent(event);

        // ボタンの表示状態を設定
        setIsButtonsVisible(!message.isAnswered);
    };

    fetchData();
  }, [paramsID]);


  // 参加するボタンがクリックされた時の処理
  const handleJoin = async () => {
      // messages テーブルから該当のデータを取得
      const { data: message, error: messagesError } = await supabase
        .from("messages")
        .select("*")
        .eq("id", paramsID)
        .single();
  
      if (messagesError) {
        console.error("メッセージの取得エラー", messagesError);
        return;
      }

      // メッセージのisAnsweredをtrueに更新
      const { data: updatedMessage, error: updateError } = await supabase
        .from("messages")
        .update({ isAnswered: true })
        .eq("id", paramsID)
        .single();

        if (updateError) {
            console.error("メッセージの更新エラー", updateError);
            return;
        }


     // ボタンの表示状態を非表示に切り替える
     setIsButtonsVisible(false);


        console.log("メッセージのisAnsweredを更新しました");     
  
      // posts テーブルから該当のデータを取得
      const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", message.postedBy);

  
      if (postsError) {
        console.error("ポストの取得エラー", postsError);
        return;
      }
  

       // userEntryStatus テーブルにデータを格納
       const { data: entryStatus, error: entryStatusError } = await supabase
       .from("userEntryStatus")
       .insert([
         {
           userID: id,
           eventID: posts[0].eventID,
           status: "false",
         },
       ]);

     if (entryStatusError) {
       console.error("エントリーステータスの格納エラー", entryStatusError);
       return;
     }

     console.log("userEntryStatusにuserID, eventID, status:falseを格納しました");

  };  


  // 拒否ボタンがクリックされた時の処理
  const handleReject = async () => {
    const { data: updatedMessage, error: updateError } = await supabase
      .from("messages")
      .update({ isAnswered: true })
      .eq("id", paramsID)
      .single();

    if (updateError) {
      console.error("メッセージの更新エラー", updateError);
      return;
    }

    console.log("メッセージのisAnsweredを更新しました");

    // ボタンの表示状態を非表示に切り替える
    setIsButtonsVisible(false);

 };

 const handleGoToEvent = () => {
    // イベント詳細画面に遷移
    navigate(`/event/${event?.id}`);
 };


  return (
    <div>
      <div className={styles.text_body}>
        <h2>{eventName}からスカウトが届きました！</h2>
        {isButtonsVisible && (
          <>
            <button onClick={handleJoin}>参加する</button>
            <button onClick={handleReject}>拒否する</button>
          </>
        )}
        {!isButtonsVisible && (
          <p>回答しました</p>
        )}        
        <Link onClick={handleGoToEvent} to={`/event/${event?.id}`}>
          <h4>{eventName}を見に行く</h4>
        </Link>
      </div>
    </div>
  );
}
