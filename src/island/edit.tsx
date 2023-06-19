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

  const [imageUrl, setImageUrl] = useState(
    "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-05T07%3A40%3A07.886Z",
  );

  const navigate = useNavigate();
  // 削除のモーダルウィンドウの開閉
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteCheckOpen, setIsDeleteCheckOpen] = useState(false);
  const [isAfterDeleteOpen, setIsAfterDeleteOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chosenTag, setChosenTag] = useState([]);

  const [islandName, setIslandName] = useState("");
  const [detail, setDetail] = useState("");
  const [tagName, setTagName] = useState([]);
  const [editMode, setEditMode] = useState(false); //editMode 状態変数を追加
  const [islandID, setIslandID] = useState<number>(); // islandIDステートを追加

  const [tagOptions, setTagOptions] =
    useState<{ id: number; Name: string; NameKana: string }[]>();
  const [islandTags, setIslandTags] = useState<
    { id: number; Name: string; NameKana: string }[]
  >([]);
  const [tagNames, setTagNames] = useState<
    { Name: string; NameKana: string; tagNameKana: string }[]
  >([]);

  useEffect(() => {
    setChosenTag(islandTags);
  }, [islandTags]);

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
      setImageUrl(island.thumbnail); // サムネイルをthumbnailステートにセット

      const { data: fetchTag, error: fetchTagError } = await supabase
        .from("tagStatus")
        .select("tagID")
        .eq("islandID", islandID)
        .eq("status", false);

      if (fetchTag) {
        const tagIDs = fetchTag.map((tg) => tg.tagID); // tagID の値の配列を作成
        const { data: fetchTagsData, error: fetchTagsError } = await supabase
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
      .from("userIcon")
      .upload(filePath, file);
    if (error) {
      console.log(error, "画像追加エラー", filePath);
    }

    setImageUrl(event.target.value);
  };

  
  // 編集ボタンを押下、島名を変更
  const handleIslandNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIslandName(e.target.value);
  };

  // 編集ボタンを押下、活動内容を変更
  const handleDetailChange = (newDetail: React.SetStateAction<string>) => {
    setDetail(newDetail); // 修正: 新しい値を detail ステートに設定する
  };


  // データベースから既に追加されているタグを取得
  const fetchTags = async () => {
    const { data: tagStatusData, error: tagStatusError } = await supabase
      .from("tagStatus")
      .select("tagID")
      .match({ islandID: String(fetchIslandID) })

    if (tagStatusError) {
      throw new Error("タグステータスの取得エラー");
    }

    if (tagStatusData && tagStatusData.length > 0) {
      const tagIDs = tagStatusData.map((data) => data.tagID);
      
      const { data: tagsData, error: tagsError } = await supabase
        .from("tags")
        .select("id, tagName")
        .in("id", tagIDs);
    
        if (tagsError) {
          throw new Error("タグの取得エラー");
        }
        if (tagsData && tagsData.length > 0) {
          const tagName = tagsData.map((tag) => tag.tagName);
          setTagName(tagName);
        } else {
          console.log("タグが見つかりません");
        }
    }
  };  
  fetchTags();


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
      }
    };

    fetchUsers();
  }, []);

  // 保存処理の実装
  const handleSaveClick = async (e: SyntheticEvent) => {
    setEditMode((prev) => !prev);
    if (!editMode) {
      return;
    }
    await handleSave();
    await createHandler();

  };

  const handleSave = async () => {
    await supabase
      .from("islands")
      .update([
        {
          islandName: islandName,
          detail: detail,
        },
      ])
      .eq("id", fetchIslandID);
      console.log("データのアップデートがされました");
  };

  const createHandler = async () => {
    if (islandName.trim() === "" || detail.trim() === "") {
      alert("島の名前と活動内容は入力必須項目です。");
      return;
    }

    const islandData = {
      islandName: islandName,
      detail: detail,
      thumbnail: imageUrl,
      status: false,
    };

    try {
      await supabase.from("islands").update(islandData).match({ id: fetchIslandID });

      // tagStatusテーブルへ挿入
      if (islandTags.length > 0) {
        const tgStatusData = islandTags.map((tag) => ({
          tagID: tag.id,
          islandID: fetchIslandID,
          status: false,
        }));
        for (let tgS of tgStatusData) {
          await supabase.from("tagStatus").insert(tgS);
        }
      }

      // tagsテーブルへ挿入
      if (tagNames.length > 0) {
        const tgNameData = tagNames.map((tagName) => ({
          tagName: tagName.Name,
          tagNameKana: tagName.NameKana,
          status: false,
        }));

        for (let tg of tgNameData) {
          const existingTag = await supabase
            .from("tags")
            .select("id")
            .eq("tagName", tg.tagName)
            .single();

          if (existingTag.data) {
            // 既存のデータがある場合は更新
            await supabase
              .from("tags")
              .update(tg)
              .eq("id", existingTag.data.id);
          } else {
            // 既存のデータがない場合は新規保存
            await supabase.from("tags").insert(tg);

            // tagStatusにも新規保存
            const newtagName = await supabase
            .from("tags")
            .select("id")
            .eq("tagName", tg.tagName)
            .single();
          
          console.log("新しいタグの名前", newtagName);
          
          const newT = {
            tagID: newtagName.data.id,
            islandID: fetchIslandID,
            status: false,
          };
          
          if (newtagName.data) {
            await supabase.from("tagStatus").insert(newT);
          }
          }
        }
      }
    } catch (error) {
      console.log("tagStatus挿入エラー");
    }
  };


  useEffect(() => {
    fetchIsland();
    fetchTags();
  }, []);


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
                  onChange={(event) => handleDetailChange(event.target.value)} // 修正: テキストエリアの値が変更されたら handleDetailChange 関数を呼び出す
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
                    disabled={!editMode}
                  />
                </div>
              </td>
            </tr>
            <tr className={styles.tr}>
              <th className={styles.th}>タグ</th>
              <td className={styles.td}>
                {!editMode &&
                    <div>{tagName}</div>
                }

                {editMode && (
                  <ComboBoxTag
                    tagOptions={tagOptions}
                    htmlFor="tag"
                    chosenTag={chosenTag}
                    islandTags={islandTags}
                    setIslandTags={setTagName}
                  />
                )}
              </td>
            </tr>

            {editMode && (
              <>
                <tr className={styles.tr}>
                  <th className={styles.th}>タグ追加</th>
                  <td className={styles.td}>
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