import { supabase } from "../../createClient";

export const fetchIslands = async (setIslands) => {
  try {
    const { data, error } = await supabase
      .from("islands")
      .select("*")
      .eq("status", false);

    if (error) {
      console.error("島情報取得失敗", error.message);
    } else {
      // データをランダムに並び替える
      const shuffledData = data.sort(() => Math.random() - 0.5);
      setIslands(shuffledData);
    }
  } catch (error) {
    console.error("島情報取得失敗", error.message);
    setIslands([]);
  }
};
