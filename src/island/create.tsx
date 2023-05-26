import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../styles/createIsland.module.css";
import ComboBox from "../components/comboBox";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../createClient";
import ConvertKanaJ from "../components/changeKana";
import AddTag from "../components/createIsland/addtag";
import IslandName from "../components/createIsland/islandName";
import Detail from "../components/createIsland/detail";

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
    // islandNameが空でないかチェック
    if (islandName.trim() === "") {
      alert("島の名前を入力してください。");
      return;
    }

    console.log(islandName);

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
                  <Detail />
                </td>
              </tr>
              <tr>
                <th>メンバー</th>
                <td>
                  <ComboBox
                    nameOptions={userOptions}
                    tagOptions={null}
                    htmlFor="user"
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
                  <ComboBox
                    tagOptions={tagOptions}
                    nameOptions={null}
                    htmlFor="tag"
                  />
                </td>
              </tr>
              <tr>
                <th>タグ追加</th>
                <td>
                  <AddTag />
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
