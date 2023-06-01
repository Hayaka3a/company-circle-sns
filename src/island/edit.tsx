import React, { useState, useEffect, SyntheticEvent } from "react";
import styles from "../styles/islandEdit.module.css";
import CreateDeletePage from "../components/modalWindows/createDeletePage";
import { supabase } from "../createClient";
import ComboBoxTag from "../components/comboBoxTag";
import AddTag from "../components/createIsland/addtag";
import LogSt from "../components/cookie/logSt";
import { useParams } from "react-router-dom";

export default function IslandEdit() {
  LogSt();
  const id= useParams();
  const fetchIslandID = id.id;

  useEffect(() => {
    fetchIsland()
  },[])

  // console.log(fetchIslandID)

  const [imageUrl, setImageUrl] = useState("/login/loginCounter.png");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [islandName, setIslandName] = useState("");
  const [detail, setDetail] = useState("");
  const [tagName, setTagName] = useState("");
  const [editMode, setEditMode] = useState(false); //editMode 状態変数を追加
  const [islandID, setIslandID] = useState<number>(); // islandIDステートを追加


  const [tagOptions, setTagOptions] =
      useState<
        { id: number; Name: string; NameKana: string; }[]
      >();
    const [islandTags, setIslandTags] = useState<
      { id: number; Name: string; NameKana: string; }[]
    >([]);
    const [tagNames, setTagNames] = useState<
    { Name: string; NameKana: string }[]
    >([]);


  // openDeleteModalの値がtrueの時だけ小窓画面をレンダリング（表示）する
  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };


// データベースからislands情報を取得
const fetchIsland = async () => {

  const { data } = await supabase
    .from("islands")
    .select("*")
    .eq("id", fetchIslandID);


  if (data) {
    const island = data[0];
    const fetchislandID = island.id;


    setIslandID(fetchislandID); // islandIDステートに値をセット
    setIslandName(island.islandName); // サークル名をislandNameステートにセット
    setDetail(island.detail); // 活動内容をdetailステートにセット
    

    const { data: fetchTag, error: fetchTagError } = await supabase
      .from("tagStatus")
      .select("tagID")
      .eq("islandID", islandID);

    if (fetchTag) {
      const tagIDs = fetchTag.map((island) => island.tagID);      
      const { data: fetchTagsData, error: fetchTagsError } = await supabase
        .from("tags")
        .select("*")
        .in("id", tagIDs);

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
          const tagNames = tags.map((tag) => ({ Name: tag.Name, NameKana: tag.NameKana }));          
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
    setDetail(e.target.value)
  };


  // タグ追加
  const addHandler = async () => {}

  // データベースから全タグ名取得
  useEffect(() => {
    const fetchUsers = async () => {
      let { data, error } = await supabase.from("tags").select();
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
        console.log(tagsAll)
      }
    };

    fetchUsers();
  }, [])
        

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
        await supabase.from("islands").update([
          {
            islandName: islandName,
            detail: detail,
          },
        ]).eq("id", fetchIslandID);
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
        status: "false"
      };

      try {
        // tagStatusテーブルへ挿入
        const tgStatusData = islandTags.map((tag) => ({
          tagID: tag.id,
          islandID: fetchIslandID, // fetchIslandIDを使用してislandIDの値を設定
          status: "false",
        }));
        for (let tgS of tgStatusData) {
          await supabase.from("tagStatus").insert(tgS);
          // console.log("tagStatusが正常に更新されました");
          // tagsテーブルへ挿入
          try {
            const tgNameData = tagNames.map((tagName) =>({
              tagName: tagName.Name,
              tagNameKana: tagName.NameKana,
              status: "false",
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
    <div className={styles.back}>
      <h1 className={styles.name}>島情報編集・削除</h1>
      <div className={styles.inputs}>
        <div className={styles.islandName}>
          <label htmlFor="islandName">島名</label>
          <input
            type="text"
            id="islandName"
            className={styles.input}
            value={islandName}
            onChange={handleIslandNameChange}
            // readOnly={!editMode}
          />
        </div>

        <div className={styles.detail}>
          <label htmlFor="detail" className={styles.detail}>活動内容</label>
          <input
            type="text"
            id="detail"
            className={styles.inputA}
            value={detail}
            onChange={handelDetailChange} // 追加
            readOnly={!editMode} // 編集モードでない場合は無効化する          
          />
        </div>

        <div className={styles.box}>
          <p
            className={styles.icon}
            id="img"
            style={{ backgroundImage: `url('${imageUrl}')` }}
          ></p>
          <label htmlFor="thumbnail">サムネイル</label>
          <input
            type="file"
            id="thumbnail"
            className={styles.inputA}
            onChange={handleFileChange}
            disabled={!editMode}
          />
        </div><br />

        <div className={styles.tag}>
          <label htmlFor="tag">タグ</label>
        </div>
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

        <div>
              <label htmlFor="addTag">タグ追加</label>
            </div>
        {editMode && (
          <>            
            <AddTag  
              setTagNames={setTagNames}
            />  
          </>   
        )}

        <button className={styles.edit_btn} onClick={handleSaveClick}>
          {editMode ? "保存" : "編集"}
        </button>
        <button onClick={openDeleteModal} className={styles.delete_btn}>削除</button>
        {isDeleteOpen && <CreateDeletePage closeDeleteModal={closeDeleteModal} />}
      </div>
    </div>  
  );
}