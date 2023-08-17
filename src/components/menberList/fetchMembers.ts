import { supabase } from "../../createClient";
import { Entryusers } from "../../types/members";
import { getLoginUser } from "./getLoginUser";

export async function fetchMembers({
  table,
  displayData,
  setEntryUsers,
  loginID,
  setLoginUser,
  entryUsers,
  setNewEntryUsers,
}) {
  //イベントの場合
  if (table === "event") {
    //イベントに参加しているサークル・難民を取り出す
    const { data, error } = await supabase
      .from("userEntryStatus")
      .select(`*,users(*)`)
      .eq("eventID", displayData.id)
      .eq(`status`, false);
    if (error || !data) {
      console.log(error, "eventFetchError");
    } else {
      //島ID・難民データをそれぞれ配列にしまう
      const tmpArry = data.filter((user) => user.userID) as Entryusers[];
      tmpArry.forEach((item) => {
        item.islandID = 0;
      });
      const islandArry = data
        .filter((ent) => ent.islandID)
        .map((is) => is.islandID);

      //各島のメンバーを取得
      const { data: entryData, error: entryError } = await supabase
        .from("userEntryStatus")
        .select(`*,users(*)`)
        .in("islandID", islandArry)
        .eq(`status`, false);
      if (entryError || !entryData) {
        console.log(entryError, "entryError");
      } else {
        //userIDが存在するデータのみに絞り込み、各島民と難民を一つの配列にしまう
        const userData = entryData.filter(
          (user) => user.userID,
        ) as Entryusers[];
        const combined = tmpArry.concat(userData);

        // 同じuserIDを持つデータを除外するための処理
        const uniqueCombined = [];
        const seenUserIDs = new Set(); // 既に追加されたuserIDを保持するSet

        for (const item of combined) {
          if (!seenUserIDs.has(item.userID)) {
            uniqueCombined.push(item);
            seenUserIDs.add(item.userID);
          }
        }

        const updatedData = uniqueCombined.map((item) => {
          if (item.userID === displayData.ownerID) {
            item.users.firstName += "(オーナー)";
          }

          return item;
        });
        setEntryUsers(updatedData);
        getLoginUser({ loginID, setLoginUser, entryUsers, setNewEntryUsers });
      }
    }
  } else {
    //島の場合
    //島民全員のデータを取得
    const { data: entryData, error: entryError } = await supabase
      .from("userEntryStatus")
      .select(`*,users(*)`)
      .eq(`${table}ID`, displayData.id)
      .eq(`status`, false);
    if (entryError || !entryData) {
      console.log(entryError, "entryError");
    } else {
      const userData = entryData.filter((user) => user.userID) as Entryusers[];

      const updatedData = userData.map((item) => {
        if (item.userID === displayData.ownerID) {
          item.users.firstName += "(オーナー)";
        }
        return item;
      });

      setEntryUsers(updatedData);
      getLoginUser({ loginID, setLoginUser, entryUsers, setNewEntryUsers });
    }
  }
}
