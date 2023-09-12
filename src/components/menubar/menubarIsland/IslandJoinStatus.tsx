// ユーザーが表示している島に参加しているかどうかチェック

import { useEffect } from "react";
import { supabase } from "../../../createClient";

export default function IslandJoinStatus({ userID, paramsID, setIsJoined }) {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("userEntryStatus")
        .select("*")
        .eq("userID", userID)
        .eq("islandID", paramsID)
        .eq("status", false);
      if (error) {
        console.log(error);
      } else if (data && data.length > 0) {
        setIsJoined(true);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID, paramsID, setIsJoined]);

  return null;
}
