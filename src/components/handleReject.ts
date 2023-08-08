import { supabase } from "../createClient";

export default  async function HandleReject(paramsID, id, setIsButtonsVisible){
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

  