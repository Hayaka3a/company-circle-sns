import React, { useState, useEffect, SyntheticEvent } from "react";
import styles from "../styles/island/islandEdit.module.css";
import CreateDeletePage from "../components/modalWindows/createDeletePage";
import { supabase } from "../createClient";
import AddTag from "../components/createIsland/addtag/addtag";
import LogSt from "../components/cookie/logSt";
import { useNavigate, useParams } from "react-router-dom";
import CreateDeleteCheck from "../components/modalWindows/createDeletingCheck";
import CreateAfterDelete from "../components/modalWindows/createAfterDelete";
import MenubarIsland from "../components/menubar/menubarIsland/menubarIsland";
import ComboBoxTag from "../components/comboBox/comboBoxTag/comboBoxTag";
import IslandDone from "../components/islandDone";
import FetchIslandEdit from "../components/fetchIslandEdit";
import FetchUsers from "../components/fetchUsers";

export default function IslandEdit() {
  LogSt();
  const id = useParams();
  const fetchIslandID = id.id;
  const [imageUrl, setImageUrl] = useState("");

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

  // 削除完了ウィンドウを閉じると、データが論理削除されてトップ画面に遷移する
  const handleDone = async () => {
    await IslandDone(islandID, inputValue, navigate, setIsAfterDeleteOpen);
  };

  useEffect(() => {
    fetchIslandEditData();
    fetchData();
  }, []);

  // データベースからislands情報を取得
  const fetchIslandEditData = async () => {
    await FetchIslandEdit(
      fetchIslandID,
      setIslandID,
      setIslandName,
      setDetail,
      setTagName,
      setChosenTag,
    );
  };

  // 画像ファイル選択したら、表示画像に反映
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
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

  // 編集ボタンを押下、島名を変更
  const handleIslandNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIslandName(e.target.value);
  };

  // 編集ボタンを押下、活動内容を変更
  const handleDetailChange = (newDetail) => {
    setDetail(newDetail); // 修正: 新しい値を detail ステートに設定する
  };

  // データベースから全タグ名取得
  const fetchData = async () => {
    await FetchUsers(setTagOptions);
  };

  // 保存処理の実装
  const handleSaveClick = (e: SyntheticEvent) => {
    setEditMode((prev) => !prev);
    if (!editMode) {
      return;
    }
    createHandler();
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
      await supabase.from("islands").update(islandData).eq("id", fetchIslandID);

      // tagStatusテーブルへ挿入
      if (islandTags.length > 0) {
        const tgStatusData = islandTags.map((tag) => ({
          tagID: tag.id,
          islandID: fetchIslandID,
          status: false,
        }));

        const existingTagStatuses = [];

        // tgStatusDataの処理
        await Promise.all(
          tgStatusData.map(async (tgS) => {
            const existingTagStatusArray = await supabase
              .from("tagStatus")
              .select("tagID")
              .eq("islandID", tgS.islandID)
              .limit(1) // 1つのレコードを取得
              .then(({ data }) => data); // データのみを取得する

            if (existingTagStatusArray.length === 0) {
              // tgSにはあるがtagStatusには存在しない場合、新規保存
              await supabase.from("tagStatus").insert(tgS);
            } else {
              existingTagStatuses.push(...existingTagStatusArray);
            }
          }),
        );
        const uniques = tagName.filter((uniqueE) => {
          return !islandTags.some((unique) => unique.id === uniqueE.id);
        });

        const uniquesAdd = islandTags.filter((uniqueE) => {
          return !tagName.some((unique) => unique.id === uniqueE.id);
        });

        if (uniquesAdd.length > 0) {
          await Promise.all(
            uniquesAdd.map(async (unique) => {
              const add = {
                tagID: unique.id,
                islandID: fetchIslandID,
                status: false,
              };
              const { error } = await supabase.from("tagStatus").insert(add);
              if (error) {
                console.error("追加エラー");
              }
            }),
          );
        }

        if (uniques.length > 0) {
          await Promise.all(
            uniques.map(async (unique) => {
              await supabase
                .from("tagStatus")
                .update({ status: true })
                .eq("tagID", unique.id);
            }),
          );
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
      window.location.reload();
    } catch (error) {
      console.log("tagStatus挿入エラー");
    }
  };

  return (
    <div className={styles.all}>
      <MenubarIsland />
      <div className={styles.back}>
        <h2 className={styles.name}>島情報編集・削除</h2>
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
                  maxLength={100}
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
                  maxLength={300}
                  onChange={(event) => handleDetailChange(event.target.value)} // 修正: テキストエリアの値が変更されたら handleDetailChange 関数を呼び出す
                  readOnly={!editMode} // 編集モードでない場合は無効化する
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
                {!editMode &&
                  tagName.map((tag) => (
                    <div key={tag.tagName}>{tag.tagName}</div>
                  ))}

                {editMode && (
                  <ComboBoxTag
                    tagOptions={tagOptions}
                    htmlFor="tag"
                    chosenTag={null}
                    setIslandTags={setIslandTags}
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
            島を削除
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
        {isAfterDeleteOpen && <CreateAfterDelete done={handleDone} />}
      </div>
    </div>
  );
}
