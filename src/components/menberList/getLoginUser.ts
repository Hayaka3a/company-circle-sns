import { supabase } from "../../createClient";
import { User } from "../../types/members";

//ログインユーザーのデータを取得
export const getLoginUser = async ({
  loginID,
  setLoginUser,
  entryUsers,
  setNewEntryUsers,
}) => {
  //ログインしているユーザーのデータを取得
  const { data: login, error: loginError } = await supabase
    .from("users")
    .select(`*`)
    .eq(`id`, loginID)
    .eq("status", false);

  if (loginError || !login) {
    console.log(loginError, "loginError");
  } else {
    const logData = login[0] as User;
    setLoginUser(logData);

    // ログインユーザーが参加者の場合、ログインユーザーを抜いた配列を新たに作る
    const filteredUsers = entryUsers.filter(
      (user) => user.userID !== loginID && user.userID,
    );
    setNewEntryUsers(filteredUsers.length > 0 ? filteredUsers : []);
  }
};
