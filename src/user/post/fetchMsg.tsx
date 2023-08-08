//メッセージ受信

import { supabase } from "../../createClient";

export default function FetchMsg(userID, setMessages) {
  const fetchMsg = async () => {
    // ログインユーザーのポスト番号取得
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("status", "false")
      .eq("userID", userID);

    if (error) {
      console.error("post情報取得失敗");
    } else {
      const postID = data[0].id;

      // ユーザーのポストに入っているメッセ情報取得
      const { data: msgs, error: msgError } = await supabase
        .from("messages")
        .select("*")
        .eq("postID", postID)
        .eq("status", false);

      if (msgError) {
        console.error("msg情報取得失敗");
      } else {
        if (msgs.length > 0) {
          // 受信しているメッセージがあるときのみ実行
          //msgsのオブジェクトデータごとにpostedByの検索をかける
          const promises = msgs.map(async (msg) => {
            const postID = msg.postedBy;
            const { data: by, error: byError } = await supabase
              .from("posts")
              .select("*, events(*), islands(*)")
              .eq("id", postID)
              .eq("status", false);

            if (byError) {
              console.error("送信者取得失敗");
            } else {
              if (by.length > 0) {
                const Object = {
                  ...msg,
                  by: by[0],
                };
                return Object;
              }
            }
          });

          Promise.all(promises)
            .then((results) => {
              const Objects = results.filter((result) => result !== undefined);

              setMessages(Objects);
            })
            .catch((error) => {
              console.error("メッセージ情報取得失敗", error);
            });
        } else {
          console.log("受信メッセージはありません");
        }
      }
    }
  };
  fetchMsg();
}
