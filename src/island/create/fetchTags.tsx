// データベースから全タグ名取得

import { supabase } from "../../createClient";

export default function FetchTags(setTagOptions) {
  const fetchTags = async () => {
    let { data, error } = await supabase
      .from("tags")
      .select()
      .eq("status", false);
    if (error) {
      console.error("Error fetching tags:", error.message);
    } else {
      const tags: { id: number; Name: string; NameKana: string }[] = data?.map(
        (tag) => ({
          id: tag.id,
          Name: tag.tagName,
          NameKana: tag.tagNameKana,
        }),
      );
      setTagOptions(tags);
    }
  };
  fetchTags();
}
