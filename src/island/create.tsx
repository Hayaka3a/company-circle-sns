import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../styles/createIsland.module.css";
import ComboBox from "../components/comboBoxUser";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../createClient";
import ConvertKanaJ from "../components/changeKana";
import AddTag from "../components/createIsland/addtag";
import IslandName from "../components/createIsland/islandName";
import Detail from "../components/createIsland/detail";
import ComboBoxUser from "../components/comboBoxUser";
import ComboBoxTag from "../components/comboBoxTag";

export default function IslandCreate() {
  const [imageUrl, setImageUrl] = useState("/login/loginCounter.png");
  const [userOptions, setUserOptions] =
    useState<
      { id: number; Name: string; NameKana: string; NameKanaJ: string }[]
    >();
  const [tagOptions, setTagOptions] =
    useState<{ id: number; Name: string; NameKana: string }[]>();
  // 各入力項目state
  const [islandName, setIslandName] = useState("");
  const [detail, setDetail] = useState("");
  const [tagName, setTagName] = useState<string[]>([]);
  const [islandMembers, setIslandMembers] = useState<
    { id: number; Name: string; NameKana: string; NameKanaJ: string }[]
  >([]);
  const [islandTags, setIslandTags] = useState<
    { id: number; Name: string; NameKana: string }[]
  >([]);

  // データベースから全ユーザー名前取得
  useEffect(() => {
    const fetchUsers = async () => {
      let { data, error } = await supabase.from("users").select();
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
      let { data, error } = await supabase.from("tags").select();
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
        console.log(data);
      }
    };

    fetchUsers();
  }, []);

  // CSS部分で画像URLを変更（imgタグ以外で挿入すれば、円形にしても画像が収縮表示されない）
  useEffect(() => {
    let circleElement = document.getElementById("img");
    if (circleElement) {
      circleElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  }, [imageUrl]);

  // 画像ファイル選択したら、表示画像に反映
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  // 島作成する
  const createHandler = async () => {
    if (islandName.trim() === "" || detail.trim() === "") {
      alert("島の名前を入力してください。");
      return;
    }
    // 現在のタイムスタンプを取得
    const createdAt = new Date().toISOString();

    console.log(islandMembers);

    console.log(createdAt);
    console.log(islandName);
    console.log(detail);
    console.log(tagName);
    console.log(islandTags);
    // 他情報ownerID。
    // tagStatusテーブルにはislandIDとtagIDを入れていき、tagsテーブルにはtagNameを入れる
    // (tagStatusテーブルのtagIDとtagsテーブルのidが同じ)

    // try {
    //   // POST
    //   const { data, error } = await supabase
    //     .from("islands")
    //     .insert([{ islandName }]);
    //   if (error) {
    //     console.error("島の作成エラー:", error.message);
    //   } else {
    //     console.log("島が正常に作成されました:", data);
    //     // islandNameの入力フィールドをリセットします
    //     setIslandName("");
    //   }
    // } catch (error) {
    //   console.error("島の作成エラー:", error.message);
    // }
  };

  return (
    <div className={styles.background}>
      <div className={styles.box}>
        <div className={styles.allContents}>
          <h1>島作成</h1>
          <div className={styles.tableCovered}>
            <table>
              <tr>
                <th>
                  島名<span className={styles.span}>【必須】</span>
                </th>
                <td>
                  <IslandName
                    islandName={islandName}
                    setIslandName={setIslandName}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  活動内容<span className={styles.span}>【必須】</span>
                </th>
                <td>
                  <Detail detail={detail} setDetail={setDetail} />
                </td>
              </tr>
              <tr>
                <th>メンバー</th>
                <td>
                  <ComboBoxUser
                    nameOptions={userOptions}
                    htmlFor="user"
                    setIslandMembers={setIslandMembers}
                  />
                </td>
              </tr>
              <tr>
                <th>サムネイル</th>
                <td className={styles.imgSide}>
                  <p className={styles.icon} id="img"></p>
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
              <tr>
                <th>タグ</th>
                <td>
                  <ComboBoxTag
                    tagOptions={tagOptions}
                    htmlFor="tag"
                    setIslandTags={setIslandTags}
                  />
                </td>
              </tr>
              <tr>
                <th>タグ追加</th>
                <td>
                  <AddTag
                    selectedValue={tagName}
                    setSelectedValue={setTagName}
                  />
                </td>
              </tr>
            </table>
          </div>

          <button onClick={createHandler}>新しい島生活を始める</button>
        </div>
      </div>
    </div>
  );
}
