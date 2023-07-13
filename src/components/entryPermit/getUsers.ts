import { Message } from "../../types/entryPermit";
import { supabase } from "../../createClient";

//messageを送ったユーザーを取得
export const getUsers = async ({
  message,
  setUser,
}: {
  message: Message;
  setUser: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  if (message) {
    let promises = message.map(async (message) => {
      const { data: userData, error: userError } = await supabase
        .from("posts")
        .select("*,users!posts_userID_fkey(*)")
        .eq("id", message.postedBy);

      if (userError) {
        console.log(userError, "ユーザー取得エラー");
      }

      let arr = { ...message, users: userData[0].users };

      return arr;
    });
    // Promise.all でまとめて待つ
    let ret = await Promise.all(promises);

    setUser(ret);
    return ret;
  }
};
