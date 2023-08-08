import { supabase } from "../createClient";

export default async function FetchTags(islandId, setTags) {
       const { data: tag, error: tagError } = await supabase
      .from("tagStatus")
      .select("*,tags(*)")
      .eq("islandID", Number(islandId.id));
    if (tagError) {
      console.log(tagError, "タグの取得に失敗しました");
    }
    if (!tag) {
      console.log("タグは見つかりませんでした");
    } else {
      setTags(tag);
    } 
};