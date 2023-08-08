import { supabase } from "../createClient";

export default async function HandleHideEventJoin(fetchEventID, setEventJoin) {
    supabase
      .from("userEntryStatus")
      .update({ status: true })
      .eq("eventID", fetchEventID)
      .then((response) => {
        // データの更新が成功した場合
        if (response.error) {
          console.log("データの更新に失敗しました。", response.error);
        } else {
          // 参加サークル名を非表示にする
          setEventJoin(null);
        }
      });
}