import { supabase } from "../../createClient";

export async function fetchData({ table, paramsID, setMessage }) {
  const { data, error } = await supabase
    .from("posts")
    .select(`*,messages!messages_postID_fkey(*,applications(*))`)
    .eq(`${table}ID`, paramsID)
    .eq("status", false);
  if (error) {
    console.log(error, "エラー");
  }
  if (!data || data.length === 0) {
    console.log("ポストまたはメッセージがみつかりませんでした");
  } else {
    //applicationsが取得できたものだけで新たな配列を作成
    const selectApp = data[0].messages.filter(
      (message) => message.applications.length > 0 && !message.isAnswered,
    );
    setMessage(selectApp);
  }
}
