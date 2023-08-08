import { supabase } from "../createClient";

// 削除完了ウィンドウを閉じると、データが論理削除されてトップ画面に遷移する
export default async function  EventDone(eventID, inputValue, fetchEventID, setIsAfterDeleteOpen, navigate) {
  setIsAfterDeleteOpen(false);

  // posts, events, userEntryStatusテーブルのstatusをtrueに変更
  const { data, error } = await supabase
    .from("events")
    .select("eventName")
    .eq("id", eventID);

  if (error) {
    console.log("Error fetching events data", error);
  }
  if (data && data.length > 0) {
    const eventName = data[0].eventName;

    if (eventName === inputValue) {
      const { error: eventsError } = await supabase
        .from("events")
        .update({ status: "true" })
        .eq("id", eventID);

      const { error: postsError } = await supabase
        .from("posts")
        .update({ status: "true" })
        .eq("eventID", eventID);

      const { error: userEntryStatusError } = await supabase
        .from("userEntryStatus")
        .update({ status: "true" })
        .match({ eventID: fetchEventID });

      if (eventsError || postsError || userEntryStatusError) {
        console.error(
          "Error changing status :",
          eventsError || postsError || userEntryStatusError,
        );
      }

      navigate("/");
      window.location.reload();
    }
  }
};
