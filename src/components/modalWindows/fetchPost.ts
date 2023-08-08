import { supabase } from "../../createClient";

export default async function FetchPost(userID, setPostedID) {
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