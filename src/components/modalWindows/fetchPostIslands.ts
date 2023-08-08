import { supabase } from "../../createClient";

export default async function FetchPostIslands(table, paramsID, setPostID, userID, setPostedID) {
    // postID: postsテーブルにある送り先（島もしくはイベント）のポスト番号📫
    const { data: postsData, error: postError } = await supabase

      .from("posts")
      .select("id")
      .eq(`${table}ID`, paramsID)
      .eq("status", false);

    if (postError) {
      console.log(postError, "ポストエラー");
    }
    setPostID(postsData[0]?.id);

    // PostedByに入れるため、送信する側のPostIDを取得する
    const { data: postedBy, error: postedByError } = await supabase
      .from("posts")
      .select("id")
      .eq("userID", userID)
      .eq("status", false);

    if (postedByError) {
      console.log(postedByError, "エラー");
    }

    if (postedBy && postedBy.length > 0 && postedBy[0].id) {
      setPostedID(postedBy[0].id);
    } else {
      console.log("PostedByIDが取得できません");
    }
};