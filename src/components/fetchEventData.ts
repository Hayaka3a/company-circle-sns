import { supabase } from "../createClient";

// fetchEventData関数の定義
export default async function FetchEventData(paramsID, setEventName, setEvent, setIsButtonsVisible){
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