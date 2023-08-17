import { supabase } from "../../createClient";

export default function NextEventHandler(
  inputValue,
  id,
  nextOpen2,
  setNotExist,
) {
  return async () => {
    if (inputValue) {
      // IDに対応するイベントの情報を取得する
      const { data, error } = await supabase
        .from("events")
        .select("eventName")
        .eq("id", id)
        .eq("status", false);

      if (error) {
        // エラーハンドリング
        console.error(error);
        return;
      }

      if (data && data.length > 0) {
        const eventName = data[0].eventName;

        if (eventName !== inputValue) {
          setNotExist("入力されたイベント名が間違っています");
        } else {
          nextOpen2();
        }
      }
    }
  };
}
