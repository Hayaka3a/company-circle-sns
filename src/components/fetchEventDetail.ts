import { supabase } from "../createClient";
import { Event } from "../types/members";

export default async function FetchEventDetail(eventId, userId, setButton, setEventDetail, setEventImage) {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId.id) // 島のIDに応じてフィルタリングする（eventId.idは該当する島のID）
      .eq("status", false);

    if (error) {
      throw new Error("fetchEventDetail: イベント取得エラー");
    }

    if (!data || data.length === 0) {
      console.warn("該当する島の詳細情報が見つかりませんでした。");
      return;
    }

    const eventDetail = data[0] as Event; // 最初のデータを取得（仮定）

    if (!eventDetail || !eventDetail.ownerID) {
      console.log("オーナーIDが見つかりません");
      return;
    }

    setEventDetail(eventDetail); // 島の詳細情報を状態変数にセット

    if (eventDetail.thumbnail) {
      setEventImage(eventDetail.thumbnail);
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", eventDetail.ownerID);

    if (userError) {
      throw new Error("ユーザーエラー");
    }

    if (!user || user.length === 0) {
      console.log("ユーザーが見つかりません");
      return;
    }

    const owner = user[0].id.toString();

    // ownerじゃない人には「編集・削除」ボタン機能を表示させない
    if (owner !== userId) {
      setButton(false);
    }
}
