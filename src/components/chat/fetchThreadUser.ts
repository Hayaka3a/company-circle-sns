import { supabase } from "../../createClient";

export const fetchThreadUser = async ({
  id,
  setThreadTitle,
  userID,
  setUser,
}) => {
  interface UserData {
    familyName: string;
    firstName: string;
    icon: string;
  }
  // threadTitleを取得
  let { data: threads, error } = await supabase
    .from("threads")
    .select(`id, threadTitle`)
    .eq("id", id)
    .eq("status", false);
  if (error) {
    console.log("fetchThreadError", error);
  }
  if (!threads) {
    return;
  } else {
    setThreadTitle(threads[0].threadTitle);
    // ログインしているユーザーネーム取得
    let { data: userData } = (await supabase
      .from("users")
      .select("*")
      .eq("status", false)
      .eq("id", userID)) as { data: UserData[] };
    if (userData && userData.length > 0) {
      setUser(userData[0]);
    }
  }
};
