import React, { useState, useEffect} from "react";
import styles from "../styles/islandEdit.module.css";
import ComboBox from "../components/comboBoxUser";
import CreateDeletePage from "../components/modalWindows/createDeletePage";
import CreateDeleteCheck from "../components/modalWindows/createDeletingCheck";
import CreateAfterDelete from "../components/modalWindows/createAfterDelete";
import { supabase } from "../createClient";
import ComboBoxTag from "../components/comboBoxTag";

export default function IslandEdit() {
  const [imageUrl, setImageUrl] = useState("/login/loginCounter.png");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteCheckOpen, setIsDleteCheckOpen] = useState(false);
  const [isAfterDeleteOpen, setIsAfterDeleteOpen] = useState(false);
  const [tagOptions, setTagOptions] =
    useState<{ id: number; Name: string; NameKana: string }[]>();
  const [islandTags, setIslandTags] = useState<
    { id: number; Name: string; NameKana: string }[]
  >([]);

  // 島を沈没（削除）させるを押した際の小窓画面（モーダルウィンドウ）の開閉
  // isDeleteCheckOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する
  const openDeleteCheckModal = () => {
    setIsDleteCheckOpen(true);
  };

  const closeDeleteCheckModal = () => {
    setIsDleteCheckOpen(false);
  };

  // 削除後の小窓画面（モーダルウィンドウ）の開閉
  // isAfterDeleteOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する
  const openAfterDeleteModal = () => {
    setIsAfterDeleteOpen(true);
  };

  const closeAfterDeleteModal = () => {
    setIsAfterDeleteOpen(false);
  };

  // データベースからタグの名前一覧を取得
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

  // タグ追加
  const addHandler = () => {};

  return (
    <div className={styles.back}>
      <h1 className={styles.name}>島情報編集・削除</h1>
      <div className={styles.inputs}>
        <div className={styles.islandName}>
          <label htmlFor="islandName">島名</label>
          <input type="text" id="islandName" className={styles.inputA} />
        </div>

        <div className={styles.detail}>
          <label htmlFor="detail" className={styles.detail}>
            活動内容
          </label>
          <input type="text" id="detail" className={styles.inputA} />
        </div>

        <div className={styles.box}>
          <p className={styles.icon} id="img"></p>
          <label htmlFor="thumbnail">サムネイル</label>
          <input
            type="file"
            id="thumbnail"
            className={styles.inputA}
            onChange={handleFileChange}
          />
        </div>
        <br />

        <div className={styles.tag}>
          <label htmlFor="tag">タグ</label>
          <ComboBoxTag
            tagOptions={tagOptions}
            htmlFor="tag"
            setIslandTags={setIslandTags}
          />
          <br />
        </div>

        <div>
          <label htmlFor="addTag">タグ追加</label>
          <input type="text" id="addTag" className={styles.inputA} />
          <button onClick={addHandler} className={styles.plus_btn}>
            追加
          </button>
        </div>
        <button className={styles.edit_btn}>編集</button>
        {/* <button onClick={openDeleteModal} id={styles.delete_btn}>削除</button> */}
        {/* {isDeleteOpen && <CreateDeletePage closeDeleteModal={closeDeleteModal} />} */}
        {/* <button onClick={openDeleteCheckModal} id={styles.delete_btn}>削除</button>
                {isDeleteCheckOpen && <CreateDeleteCheck closeDeleteCheckModal={closeDeleteCheckModal} />} */}
        <button onClick={openAfterDeleteModal} id={styles.delete_btn}>
          削除
        </button>
        {isAfterDeleteOpen && (
          <CreateAfterDelete closeAfterDModal={closeAfterDeleteModal} />
        )}
      </div>
    </div>
  );
}
function setIslands(data: { [x: string]: any; }[]) {
    throw new Error("Function not implemented.");
}

