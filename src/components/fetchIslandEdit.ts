import { supabase } from "../createClient";

export default async function FetchIslandEdit(fetchIslandID, setIslandID, setIslandName, setDetail, setTagName, setChosenTag) {
    const { data } = await supabase
      .from("islands")
      .select("*")
      .eq("id", fetchIslandID)
      .eq("status", false);

    if (data) {
      const fetchislandID = data[0].id;

      setIslandID(fetchislandID); // islandIDステートに値をセット
      setIslandName(data[0].islandName); // サークル名をislandNameステートにセット
      setDetail(data[0].detail); // 活動内容をdetailステートにセット

      const { data: fetchTag } = await supabase
        .from("tagStatus")
        .select("tagID")
        .eq("islandID", fetchIslandID)
        .eq("status", false);

      if (fetchTag) {
        const tagIDs = fetchTag.map((tg) => tg.tagID); // tagID の値の配列を作成

        const { data: fetchTagsData } = await supabase
          .from("tags")
          .select("id, tagName, tagNameKana")
          .in("id", tagIDs) // tagIDs を配列として渡す
          .eq("status", false);

        setTagName(fetchTagsData);

        const tagsAll: { id: number; Name: string; NameKana: string }[] =
          fetchTagsData?.map((tag) => ({
            id: tag.id,
            Name: tag.tagName,
            NameKana: tag.tagNameKana,
          }));

        Promise.resolve(tagsAll)
          .then((resolvedTagsAll) => {
            setChosenTag(resolvedTagsAll);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
};