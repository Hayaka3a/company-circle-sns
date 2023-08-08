import { supabase } from "../../createClient";

// 島かイベントのポストを取得、postIDに格納
export default async function FetchIslandPost(table, paramsID, setPostID) {
 const { data: post, error: postError } = await supabase
      .from("posts")
      .select("id")
      .eq(`${table}ID`, paramsID);

    if (postError) {
      console.error(postError, "エラー");
    }

    if (post && post.length > 0) {
      const postId = post[0].id;
      setPostID(postId);
    } else {
      console.log("該当するポストが見つかりませんでした");
    }
};    