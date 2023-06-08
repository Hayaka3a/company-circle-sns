import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../styles/island/createIsland.module.css";
import { supabase } from "../createClient";
import ConvertKanaJ from "../components/changeKana";
import AddTag from "../components/createIsland/addtag";
import IslandName from "../components/createIsland/islandName";
import Detail from "../components/createIsland/detail";
import ComboBoxUser from "../components/comboBoxUser";
import ComboBoxTag from "../components/comboBoxTag";
import GetCookieID from "../components/cookie/getCookieId";
import { useNavigate } from "react-router-dom";
import LogSt from "../components/cookie/logSt";

export default function IslandCreate() {
  LogSt();
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

  // データベースから全ユーザー名前取得
  useEffect(() => {
    const fetchUsers = async () => {
      let { data, error } = await supabase
        .from("users")
        .select()
        .eq("status", false);
      if (error) {
        console.error("Error fetching users:", error.message);
      } else {
        const users: {
          id: number;
          Name: string;
          NameKana: string;
          NameKanaJ: string;
        }[] = data?.map((user) => ({
          id: user.id,
          Name: `${user.familyName} ${user.firstName}`,
          NameKana: `${user.familyNameKana} ${user.firstNameKana}`,
          NameKanaJ: `${ConvertKanaJ(user.familyNameKana)} ${ConvertKanaJ(
            user.firstNameKana,
          )}`,
        }));
        setUserOptions(users);
      }
    };

    fetchUsers();
  }, []);

  // データベースから全タグ名取得
  useEffect(() => {
    const fetchUsers = async () => {
      let { data, error } = await supabase
        .from("tags")
        .select()
        .eq("status", false);
      if (error) {
        console.error("Error fetching tags:", error.message);
      } else {
        const tags: { id: number; Name: string; NameKana: string }[] =
          data?.map((tag) => ({
            id: tag.id,
            Name: tag.tagName,
            NameKana: tag.tagNameKana,
          }));
        setTagOptions(tags);
      }
    };

    fetchUsers();
  }, []);

  // 画像ファイル選択したら、表示画像に反映
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length == 0) {
      // 画像が選択されていないのでreturn
      return;
    }

    const file = event.target.files?.[0];
    const random = Math.floor(Math.random() * 10000);
    const filePath = `${file.name}${random}`; // 画像の保存先のpathを指定
    const { error } = await supabase.storage
      .from("islandIcon")
      .upload(filePath, file);
    if (error) {
      console.log(error, "画像追加エラー", filePath);
    }

    const { data } = supabase.storage.from("islandIcon").getPublicUrl(filePath);
    setImageUrl(data.publicUrl);
  };

  // 島作成する
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
            // tagStatusテーブルへ挿入
            try {
              const tgStatusData = islandTags.map((tag) => ({
                tagID: tag.id,
                islandID: createdIslandId,
                status: false,
              }));
              for (let tgS of tgStatusData) {
                await supabase.from("tagStatus").insert(tgS);
                console.log("tagStatusが正常に作成されました");
                // tagsテーブルへ挿入
                try {
                  const tgNameData = tagNames.map((tagName) => ({
                    tagName: tagName.Name,
                    tagNameKana: tagName.NameKana,
                    status: false,
                  }));
                  for (let tg of tgNameData) {
                    await supabase.from("tags").insert(tg);
                  }
                } catch (error) {
                  console.log("tags挿入エラー");
                }
              }
            } catch (error) {
              console.log("tagStatus挿入エラー");
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

  return (
    <div className={styles.background}>
      <div className={styles.box}>
        <div className={styles.allContents}>
          <h2 className={styles.h2}>新しい島を作成</h2>
          <div className={styles.tableCovered}>
            <table className={styles.table}>
              <tbody className={styles.tbody}>
                <tr className={styles.tr}>
                  <th className={styles.th}>
                    島名<span className={styles.span}>【必須】</span>
                  </th>
                  <td className={styles.td}>
                    <IslandName
                      islandName={islandName}
                      setIslandName={setIslandName}
                    />
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>
                    活動内容<span className={styles.span}>【必須】</span>
                  </th>
                  <td className={styles.td}>
                    <Detail detail={detail} setDetail={setDetail} />
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>メンバー</th>
                  <td className={styles.td}>
                    <ComboBoxUser
                      nameOptions={userOptions}
                      htmlFor="user"
                      setIslandMembers={setIslandMembers}
                    />
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>サムネイル</th>
                  <td className={styles.imgSide}>
                    <img
                      className={styles.icon}
                      src={imageUrl || "/island/island_icon.png"}
                      alt="island Thumbnail"
                    />
                    <div className={styles.faileCenter}>
                      <input
                        type="file"
                        id="thumbnail"
                        className={styles.inputA}
                        onChange={handleFileChange}
                      />
                    </div>
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>タグ</th>
                  <td className={styles.td}>
                    <ComboBoxTag
                      tagOptions={tagOptions}
                      htmlFor="tag"
                      setIslandTags={setIslandTags}
                    />
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>タグ追加</th>
                  <td className={styles.td}>
                    <AddTag setTagNames={setTagNames} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            onClick={createHandler}
            disabled={!islandName.trim() || !detail.trim()}
          >
            新しい島生活を始める
          </button>
        </div>
      </div>
    </div>
  );
}
