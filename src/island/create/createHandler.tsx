// 島作成する

import { useNavigate } from "react-router-dom";
import { supabase } from "../../createClient";
import { useState } from "react";
import GetCookieID from "../../components/cookie/getCookieId";

export default function useCreateIslandHandler() {
  const navigate = useNavigate();
  const [userOptions, setUserOptions] =
    useState<
      { id: number; Name: string; NameKana: string; NameKanaJ: string }[]
    >();
  const [tagOptions, setTagOptions] =
    useState<{ id: number; Name: string; NameKana: string }[]>();
  const [imageUrl, setImageUrl] = useState("");
  const [islandName, setIslandName] = useState("");
  const [detail, setDetail] = useState("");
  const [tagNames, setTagNames] = useState<
    { Name: string; NameKana: string }[]
  >([]);
  const [islandMembers, setIslandMembers] = useState<
    { id: number; Name: string; NameKana: string; NameKanaJ: string }[]
  >([]);
  const [islandTags, setIslandTags] = useState<
    { id: number; Name: string; NameKana: string }[]
  >([]);

  // cookie取得(コンポーネント内実施)
  const ownerID = GetCookieID();

  const createHandler = async () => {
    if (islandName.trim() === "" || detail.trim() === "") {
      alert("島の名前と活動内容は入力必須項目です。");
      return;
    }

    const islandData = {
      islandName: islandName,
      detail: detail,
      ownerID: ownerID,
      thumbnail: imageUrl,
      status: false,
    };

    try {
      const { error } = await supabase.from("islands").insert(islandData);
      if (error) {
        console.error("島の作成エラー:", error.message);
      } else {
        // 作成された島のIDを取得
        const { data } = await supabase
          .from("islands")
          .select("id")
          .eq("islandName", islandName)
          .eq("status", false);
        const createdIslandId = data[0].id;

        //　作成者のデータをuserEntryStatusへ挿入
        const ownerData = {
          userID: ownerID,
          islandID: createdIslandId,
          status: "false",
        };
        const { error: owner } = await supabase
          .from("userEntryStatus")
          .insert(ownerData);

        if (owner) {
          console.log(owner, "オーナーデータ挿入失敗");
        }

        // postテーブルに島用ポスト作成
        const post = {
          islandID: createdIslandId,
          status: false,
        };
        const { error } = await supabase.from("posts").insert(post);
        if (error) {
          console.log("ポスト作成に失敗しました");
        }

        // userEntryStatusテーブルへ挿入
        try {
          const enStatusData = islandMembers.map((user) => ({
            userID: user.id,
            islandID: createdIslandId,
            status: false,
          }));
          for (let entry of enStatusData) {
            await supabase.from("userEntryStatus").insert(entry);
            console.log("userEntryStatusが正常に作成されました");
          }
          // tagStatusテーブルへ挿入
          if (islandTags.length > 0) {
            const tgStatusData = islandTags.map((tag) => ({
              tagID: tag.id,
              islandID: createdIslandId,
              status: false,
            }));
            for (let tgS of tgStatusData) {
              await supabase.from("tagStatus").insert(tgS);
              console.log("tagStatusが正常に作成されました");
            }
          }
          // tagsテーブルへ挿入
          if (tagNames.length > 0) {
            try {
              const tgNameData = tagNames.map((tagName) => ({
                tagName: tagName.Name,
                tagNameKana: tagName.NameKana,
                status: false,
              }));
              for (let tg of tgNameData) {
                await supabase.from("tags").insert(tg);
                // 作成されたタグのidを取得
                const { data: newTag } = await supabase
                  .from("tags")
                  .select("id")
                  .eq("tagName", tg.tagName)
                  .eq("status", false);
                const createdTagId = newTag[0].id;

                const tagInfo = {
                  tagID: createdTagId,
                  islandID: createdIslandId,
                  status: false,
                };

                // tagStatusにタグ情報を挿入
                await supabase.from("tagStatus").insert(tagInfo);
              }
            } catch (error) {
              console.log("tags挿入エラー");
            }
          }
        } catch (error) {
          console.log("userEnryStatus挿入エラー");
        }

        navigate(`/island/${createdIslandId}`);
        window.location.reload();
      }
    } catch (error) {
      console.error("島の作成エラー:", error.message);
    }
  };
  return {
    imageUrl,
    setImageUrl,
    islandName,
    setIslandName,
    userOptions,
    setUserOptions,
    tagOptions,
    setTagOptions,
    islandMembers,
    setIslandMembers,
    detail,
    setDetail,
    islandTags,
    tagNames,
    setTagNames,
    setIslandTags,
    createHandler,
  };
}
