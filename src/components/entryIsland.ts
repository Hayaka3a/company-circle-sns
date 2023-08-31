import { supabase } from "../createClient";

export default async function EntryIsland(fetchEventID, setIslandJoinID, setEventJoin) {
  const { data, error } = await supabase
    .from("userEntryStatus")
    .select("islandID, status")
    .eq("eventID", fetchEventID)
    .eq("status", false);

  if (error) {
    console.log("参加サークル取得に失敗しました", error);
    return;
  }

  if (!data || data.length === 0) {
    console.log("該当する参加サークルが見つかりませんでした");
    return;
  }

  const joinIslandIDs = data
    .filter((entry) => entry.status === false)
    .map((entry) => entry.islandID);

  if (joinIslandIDs.length === 0) {
    console.log("該当する参加サークルが見つかりませんでした");
    return;
  }

  setIslandJoinID(joinIslandIDs);

  const filteredJoinIslandIDs = joinIslandIDs.filter(id => id !== null);

  const { data: islandData, error: islandError } = await supabase
    .from("islands")
    .select("islandName, id")
    .in("id", filteredJoinIslandIDs)
    .eq("status", false);


  if (islandError) {
    console.log("島名取得に失敗しました", islandError);
    return;
  }

  if (!islandData || islandData.length === 0) {
    console.log("該当する島が見つかりませんでした");
    return;
  }
  const islandNames = islandData.map((island) => island.islandName);
  const joinedNames = islandNames.join(", ");

  const islandJoinName = islandNames.map((islandName, i) => islandName.islandName)
  
  setEventJoin(joinedNames);
}
