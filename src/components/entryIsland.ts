import { supabase } from "../createClient";

export default async function EntryIsland(fetchEventID, setIslandJoinID, setEventJoin) {
    const { data, error } = await supabase
      .from("userEntryStatus")
      .select("islandID, status")
      .eq("eventID", fetchEventID);

    if (error) {
      console.log("参加サークル取得に失敗しました", error);
      return;
    }

    if (!data || data.length === 0) {
      console.log("該当する参加サークルが見つかりませんでした");
      return;
    }

    const joinIslandIDs = data
      .filter((entry) => entry.status === false) // statusがfalseのデータのみフィルタリング
      .map((entry) => entry.islandID); // フィルタリングされたデータの島IDを抽出

    if (joinIslandIDs.length === 0) {
      console.log("該当する参加サークルが見つかりませんでした");
      return;
    }

    setIslandJoinID(joinIslandIDs[0]);

    // islandsテーブルからislandNameを取得
    const { data: islandData, error: islandError } = await supabase
      .from("islands")
      .select("islandName, id")
      .in("id", joinIslandIDs);

    if (islandError) {
      console.log("島名取得に失敗しました", islandError);
      return;
    }

    if (!islandData || islandData.length === 0) {
      console.log("該当する島が見つかりませんでした");
      return;
    }

    const islandNames = islandData.map((island) => island.islandName);
    const joinedNames = islandNames.join(", "); // 配列の要素を結合した文字列を作成

    setEventJoin(joinedNames); // 参加サークルをeventJoinステートにセット
};