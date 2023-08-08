import { supabase } from "../../createClient";

export default async function FetchEventPost(paramsID, setPostID) {
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("id")
    .eq("eventID", paramsID)
    .eq("status", false);

  if (postError) {
    console.error(postError, "エラー");
  }

  if (post && post.length > 0) {
    const postId = post[0].id;
    setPostID(postId);
  } else {
    console.log("該当する投稿が見つかりませんでした");
  }
};
