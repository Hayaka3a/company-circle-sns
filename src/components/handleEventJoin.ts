import { supabase } from "../createClient";

export default async function HandleEventJoin(paramsID, id, setIsButtonsVisible) {
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