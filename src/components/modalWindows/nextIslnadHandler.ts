import { supabase } from "../../createClient";

export default function NextIslandHandler(
    inputValue,
    id,
    nextOpen2,
    setNotExist
) {
  return async () => {
    if (inputValue) {
      // IDに対応する島の情報を取得する
      const { data, error } = await supabase
        .from("islands")
        .select("islandName")
        .eq("id", id)
        .eq("status", false);

      if (error) {
        // エラーハンドリング
        console.error(error);
        return;
      }

      if (data && data.length > 0) {
        const islandName = data[0].islandName;

        if (islandName !== inputValue) {
          setNotExist("入力された島名が間違っています");
        } else {
          nextOpen2();
        }
      }
    }
  };
}
