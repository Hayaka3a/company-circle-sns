import { supabase } from "../createClient";

// データベースから全タグ名取得
export default async function FetchUsers(setTagOptions) {
const { data, error } = await supabase
        .from("tags")
        .select()
        .eq("status", false);
      if (error) {
        console.error("Error fetching tags:", error.message);
      } else {
        const tagsAll: { id: number; Name: string; NameKana: string }[] =
          data?.map((tag) => ({
            id: tag.id,
            Name: tag.tagName,
            NameKana: tag.tagNameKana,
          }));
        setTagOptions(tagsAll);
      }
};
