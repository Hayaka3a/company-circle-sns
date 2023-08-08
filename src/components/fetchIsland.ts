import { supabase } from "../createClient";

// selectタグの選択項目を取得
export default async function FetchIsland(setIslands, islandID) {
    const islandID_N = Number(islandID);
    
    const { data, error } = await supabase
    .from("islands")
    .select("id, islandName")
    .eq("status", false);
  if (error) {
    console.error(error);
  } else {
    // 今開いている島は選択項目から除外する
    const filteredData = data.filter((island) => island.id !== islandID_N);
    setIslands(filteredData);
  }
};
