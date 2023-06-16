import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import styles from "../styles/message.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import LogSt from "./cookie/logSt";
import { useCookies } from "react-cookie";

export default function ScoutPostIsland({ table }: { table: string }) {
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

  const [islandName, setIslandName] = useState("");
  const [island, setIsland] = useState<any>(null)
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

        // islands テーブルから該当のデータを取得
        const { data: island, error: islandsError } = await supabase
          .from("islands")
          .select("islandName, id")
          .eq("id", post.islandID)
          .single();

        if (islandsError) {
          console.error("イベント情報の取得エラー", islandsError);
          return;
        }

        console.log(island)

        // イベント名を設定
        setIslandName(island.islandName);
        setIsland(island);

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
           islandID: posts[0].islandID,
           status: "false",
         },
       ]);

     if (entryStatusError) {
       console.error("エントリーステータスの格納エラー", entryStatusError);
       return;
     }

     console.log("userEntryStatusにuserID, islandID, status:falseを格納しました");

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
    navigate(`/island/${island?.id}`);
 };

 return (
  <div>
    <div className={styles.text_body}>
      <h2 >{islandName}島からスカウトが届きました！</h2>
      {isButtonsVisible && (
          <>
            <button onClick={handleJoin}>参加する</button>
            <button onClick={handleReject}>拒否する</button>
          </>
        )}
        {!isButtonsVisible && (
          <p>回答しました</p>
        )}
        <Link onClick={handleGoToEvent} to={`/island/${island?.id}`}>
          <h4>{islandName}島を見に行く</h4>
        </Link>
    </div>   
  </div>
);
}
