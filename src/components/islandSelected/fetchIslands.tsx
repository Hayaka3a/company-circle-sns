// selectタグの選択項目を取得

import { supabase } from "../../createClient";

export default function FetchIslands(islandIDs, setIslands) {
  const fetchIslands = async () => {
    const { data, error } = await supabase
      .from("islands")
      .select("id, islandName");
    if (error) {
      console.error(error);
    } else {
      // 今開いている島は選択項目から除外する
      const filteredData = data.filter(
        (island) => !islandIDs.includes(island.id.toString()),
      );
      setIslands(filteredData);
    }
  };
  fetchIslands();
}
