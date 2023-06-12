import React, { useState, useEffect, SyntheticEvent } from "react";
import styles from "../styles/island/islandEdit.module.css";
import CreateDeletePage from "../components/modalWindows/createDeletePage";
import { supabase } from "../createClient";
import ComboBoxTag from "../components/comboBoxTag";
import AddTag from "../components/createIsland/addtag";
import LogSt from "../components/cookie/logSt";
import { useNavigate, useParams } from "react-router-dom";
import CreateDeleteCheck from "../components/modalWindows/createDeletingCheck";
import CreateAfterDelete from "../components/modalWindows/createAfterDelete";
import MenubarIsland from "../components/menubarIsland";

export default function IslandEdit() {
  LogSt();
  const id = useParams();
  const fetchIslandID = id.id;

  useEffect(() => {
    fetchIsland();
  }, []);

  // console.log(fetchIslandID)

  const [imageUrl, setImageUrl] = useState("/login/loginCounter.png");

  const navigate = useNavigate();
  // 削除のモーダルウィンドウの開閉
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteCheckOpen, setIsDeleteCheckOpen] = useState(false);
  const [isAfterDeleteOpen, setIsAfterDeleteOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [islandName, setIslandName] = useState("");
  const [detail, setDetail] = useState("");
  const [tagName, setTagName] = useState("");
  const [editMode, setEditMode] = useState(false); //editMode 状態変数を追加
  const [islandID, setIslandID] = useState<number>(); // islandIDステートを追加

  const [tagOptions, setTagOptions] =
    useState<{ id: number; Name: string; NameKana: string }[]>();
  const [islandTags, setIslandTags] = useState<
    { id: number; Name: string; NameKana: string }[]
  >([]);
  const [tagNames, setTagNames] = useState<
    { Name: string; NameKana: string }[]
  >([]);

  // 島を沈没させてもよろしいですか？モーダルウィンドウを表示
  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };
  // 島を沈没させてもよろしいですか？モーダルウィンドウを非表示
  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  // 島を沈没させてもよろしいですか？を閉じて、入力ウィンドウを表示
  const nextOpen = () => {
    setIsDeleteOpen(false);
    setIsDeleteCheckOpen(true);
  };

  // 入力のウィンドウを閉じて、削除完了のウィンドウを表示する
  const nextOpen2 = () => {
    setIsDeleteCheckOpen(false);
    setIsAfterDeleteOpen(true);
  };

  // 入力ウィンドウで×ボタンを押したら画面が閉じる
  const close2Modal = () => {
    setIsDeleteCheckOpen(false);
  };

  // 削除完了ウィンドウを閉じると、データが論理削除されて新規登録画面に遷移する
  const done = async () => {
    setIsAfterDeleteOpen(false);

    // posts, islands, tagStatusテーブルのstatusをtrueに変更
    const { data, error } = await supabase
      .from("islands")
      .select("islandName")
      .eq("id", islandID)
      .eq("status", false);

    if (error) {
      console.log("Error fetching islands data", error);
    }
    if (data && data.length > 0) {
      const islandName = data[0].islandName;

      if (islandName === inputValue) {
        const { error: islandsError } = await supabase
          .from("islands")
          .update({ status: "true" })
          .eq("id", islandID);

        const { error: islandsTagError } = await supabase
          .from("tagStatus")
          .update({ status: "true" })
          .eq("id", islandID);

        const { error: postsError } = await supabase
          .from("posts")
          .update({ status: "true" })
          .eq("id", islandID);

        if (islandsError || islandsTagError || postsError) {
          console.error(
            "Error changing status :",
            islandsError || islandsTagError || postsError,
          );
          // Cookie情報の削除
          if (document.cookie !== "") {
            let expirationDate = new Date("1999-12-31T23:59:59Z");
            document.cookie = `id=; expires=${expirationDate.toUTCString()}; path=/;`;
            document.cookie = `loginSt=; expires=${expirationDate.toUTCString()}; path=/;`;
          }
        }

        console.log("Change status of islands successfully.");
        navigate("/island/create");
        window.location.reload();
      }
    }
  };

  // データベースからislands情報を取得
  const fetchIsland = async () => {
    const { data } = await supabase
      .from("islands")
      .select("*")
      .eq("id", fetchIslandID)
      .eq("status", false);

    if (data) {
      const island = data[0];
      const fetchislandID = island.id;

      setIslandID(fetchislandID); // islandIDステートに値をセット
      setIslandName(island.islandName); // サークル名をislandNameステートにセット
      setDetail(island.detail); // 活動内容をdetailステートにセット

      const { data: fetchTag, error: fetchTagError } = await supabase
        .from("tagStatus")
        .select("tagID")
        .eq("islandID", islandID)
        .eq("status", false);

      if (fetchTag) {
        const tagIDs = fetchTag.map((island) => island.tagID);
        const { data: fetchTagsData, error: fetchTagsError } = await supabase
          .from("tags")
          .select("*")
          .in("id", tagIDs)
          .eq("status", false);

        if (fetchTagsData) {
          const tags: {
            id: number;
            Name: string;
            NameKana: string;
            // NameKanaJ: string;
          }[] = fetchTagsData.map((tag) => ({
            id: tag.id,
            Name: tag.tagName,
            NameKana: tag.tagNameKana,
            // NameKanaJ: `${ConvertKanaJ(tag.tagNameKana)}`,
          }));
          if (tags.length > 0) {
            const tagNames = tags.map((tag) => ({
              Name: tag.Name,
              NameKana: tag.NameKana,
            }));
            setTagNames(tagNames);
            // console.log(tagNames)
          }
        }
      }
    }
  };

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

  // 編集ボタンを押下、島名を変更
  const handleIslandNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIslandName(e.target.value);
  };

  // 編集ボタンを押下、活動内容を変更
  const handelDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetail(e.target.value);
  };

  // タグ追加
  const addHandler = async () => {};

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
        const tagsAll: { id: number; Name: string; NameKana: string }[] =
          data?.map((tag) => ({
            id: tag.id,
            Name: tag.tagName,
            NameKana: tag.tagNameKana,
          }));
        setTagOptions(tagsAll);
        console.log(tagsAll);
      }
    };

    fetchUsers();
  }, []);

  // 保存処理の実装
  const handleSaveClick = (e: SyntheticEvent) => {
    setEditMode((prev) => !prev);
    if (!editMode) {
      return;
    }
    handleSave();
    createHandler();
    // fetchislandID();
  };

  const handleSave = async () => {
    try {
      await supabase
        .from("islands")
        .update([
          {
            islandName: islandName,
            detail: detail,
          },
        ])
        .eq("id", fetchIslandID);
      console.log("Data updated successfully.");
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  // const island = data[0];
  // const fetchislandID = island.id ;

  const createHandler = async () => {
    if (islandName.trim() === "" || detail.trim() === "") {
      alert("島の名前と活動内容は入力必須項目です。");
      return;
    }

    const islandData = {
      islandName: islandName,
      detail: detail,
      status: false,
    };

    try {
      // tagStatusテーブルへ挿入
      const tgStatusData = islandTags.map((tag) => ({
        tagID: tag.id,
        islandID: fetchIslandID, // fetchIslandIDを使用してislandIDの値を設定
        status: false,
      }));
      for (let tgS of tgStatusData) {
        await supabase.from("tagStatus").insert(tgS);
        // console.log("tagStatusが正常に更新されました");
        // tagsテーブルへ挿入
        try {
          const tgNameData = tagNames.map((tagName) => ({
            tagName: tagName.Name,
            tagNameKana: tagName.NameKana,
            status: false,
          }));
          for (let tg of tgNameData) {
            await supabase.from("tags").insert(tg);
            console.log("tagsが正常に更新されました");
          }
        } catch (error) {
          console.log("tags挿入エラー");
        }
      }
    } catch (error) {
      console.log("tagStatus挿入エラー");
    }
  };

  return (
    <div className={styles.all}>
      <MenubarIsland />
      <div className={styles.back}>
        <h1 className={styles.name}>島情報編集・削除</h1>
        <table className={styles.table}>
          <tbody className={styles.tbody}>
            <tr className={styles.tr}>
              <th className={styles.th}>島名</th>
              <td className={styles.td}>
                <input
                  type="text"
                  id="islandName"
                  className={styles.input}
                  value={islandName}
                  onChange={handleIslandNameChange}
                  readOnly={!editMode}
                />
              </td>
            </tr>
            <tr className={styles.tr}>
              <th className={styles.th}>活動内容</th>
              <td className={styles.td}>
                <textarea
                  id="detail"
                  className={styles.detail}
                  value={detail}
                  onChange={(e) => handelDetailChange} // 追加
                  readOnly={!editMode} // 編集モードでない場合は無効化する
                />
              </td>
            </tr>
            <tr className={styles.tr}>
              <th className={styles.th}>サムネイル</th>
              <td className={styles.imgSide}>
                <div className={styles.faileCenter}>
                  <img
                    className={styles.icon}
                    src={imageUrl}
                    alt="island Thumbnail"
                  />
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
              <td>
                {tagName}
                {editMode && (
                  <ComboBoxTag
                    tagOptions={tagOptions}
                    htmlFor="tag"
                    setIslandTags={setIslandTags}
                  />
                )}
                <div>
                  {tagNames.map((tag, index) => (
                    <div key={index}>{tag.Name}</div>
                  ))}
                </div>
              </td>
            </tr>

            {editMode && (
              <>
                <tr className={styles.tr}>
                  <th className={styles.th}>タグ追加</th>
                  <td>
                    <AddTag setTagNames={setTagNames} />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <button className={styles.edit_btn} onClick={handleSaveClick}>
          {editMode ? "保存" : "編集"}
        </button>

        <div className={styles.delete}>
          <button onClick={openDeleteModal} className={styles.delete_btn}>
            アカウントを削除
          </button>
        </div>
        {isDeleteOpen && (
          <CreateDeletePage
            closeDeleteModal={closeDeleteModal}
            nextOpen={nextOpen}
          />
        )}
        {isDeleteCheckOpen && (
          <CreateDeleteCheck
            close2Modal={close2Modal}
            nextOpen2={nextOpen2}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        )}
        {isAfterDeleteOpen && <CreateAfterDelete done={done} />}
      </div>
    </div>
  );
}
