import { supabase } from "../../createClient";

export const fetchMsg = async ({ paramsID, setMessages }) => {
  // 島ポスト番号を検索
  const { data, error } = await supabase
    .from("posts")
    .select("id")
    .eq("status", false)
    .eq("islandID", paramsID);

  if (error) {
    console.error("post情報取得失敗");
  } else {
    const postID = data[0].id;
    // 島ポストに届いているメッセージ検索
    const { data: msgsUnfil, error: msgError } = await supabase
      .from("messages")
      .select("*, applications(*)")
      .eq("postID", postID)
      .eq("status", false)
      .order("sendingDate", { ascending: false });

    // applicationsにデータがある場合は排除（住民許可申請は表示させない）
    let msgs = msgsUnfil.filter(function (ms) {
      return ms.applications.length === 0;
    });

    if (msgError) {
      console.error("msg情報取得失敗");
    } else {
      //msgsのオブジェクトデータごとにpost情報を取得
      const userPromises = msgs.map(async (msg) => {
        const postID = msg.postedBy;

        const { data: by, error: byError } = await supabase
          .from("posts")
          .select("*, users(*)")
          .eq("id", postID)
          .eq("status", false)
          .single();

        if (byError) {
          console.error("送信者取得失敗");
        } else {
          // ユーザーネームとユーザーのポスト情報がついているbyとmsgsを結び付ける
          const userObject = {
            ...msg,
            by: by,
          };
          return userObject;
        }
      });
      // 全てのデータがそろうのを待ってから挿入
      const resolvedUserData = await Promise.all(userPromises);
      setMessages(resolvedUserData);
    }
  }
};
