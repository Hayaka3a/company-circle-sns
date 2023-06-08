import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { supabase } from "../createClient";
import styles from "../styles/island/createIsland.module.css";

export default function SelectIsland({
  islandID,
  setIslandTags,
}: {
  islandID: string;
  setIslandTags: Dispatch<SetStateAction<{ id: number; islandName: string }[]>>;
}) {
  const [islands, setIslands] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [tempSelectedValues, setTempSelectedValues] = useState([]); // 一時的な選択値を格納する配列
  const [selectError, setSelectError] = useState("");

  const islandID_N = Number(islandID);

  // selectタグの選択項目を取得
  const fetchIslands = async () => {
    const { data, error } = await supabase
      .from("islands")
      .select("id, islandName");
    if (error) {
      console.error(error);
    } else {
      // 今開いている島は選択項目から除外する
      const filteredData = data.filter((island) => island.id !== islandID_N);
      setIslands(filteredData);
    }
  };

  useEffect(() => {
    fetchIslands();
  }, []);

  // 選択項目
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setTempSelectedValues(selectedOptions); // 一時的な選択値を更新する
  };

  //   追加ボタン押されたらタグを追加
  // 追加ボタン押されたらタグを追加
  const addNameHandler = () => {
    // 既に追加されている値を選択しようとした場合にエラーメッセージを表示
    const duplicates = tempSelectedValues.filter((selectedValue) =>
      selectedValues.some((value) => value === selectedValue),
    );
    if (duplicates.length > 0) {
      setSelectError("選択された値は既に追加されています。");
      return;
    }
    // タグを追加
    setSelectedValues((prevSelectedValues) => [
      ...prevSelectedValues,
      ...tempSelectedValues,
    ]);

    tempSelectedValues.forEach((selectedValue) => {
      const existingOption = islands.find(
        (island) => island.islandName === selectedValue,
      );

      if (existingOption) {
        // 配列にオブジェクトを追加していく
        setIslandTags((prevTags) => [...prevTags, existingOption]);
      }
    });

    setTempSelectedValues([]); // 一時的な選択値をリセットする
    setSelectError(""); // エラーメッセージをリセットする
  };

  // タグの削除
  const deleteNameHandler = (index) => {
    // 削除されたタグの名前を配列の中へ格納
    const updatedValues = [...selectedValues];
    // その配列を空にする
    updatedValues.splice(index, 1);
    setSelectedValues(updatedValues);

    // 削除されたタグのオブジェクトを取り出す
    const deletedOption = islands.find(
      (island) => island.islandName === selectedValues[index],
    );

    if (deletedOption) {
      // フィルタリングして排除する
      setIslandTags((prevTags) =>
        prevTags.filter((tag) => tag.id !== deletedOption.id),
      );
    }
  };

  return (
    <>
      <div>共同開催する島がある場合は、ここから選択してください</div>
      <select
        name="islands"
        multiple
        size={4}
        onChange={handleSelectChange} // 選択が変更されたときの処理を追加
      >
        <optgroup label="島名">
          {islands.map((island) => (
            <option key={island.islandName} value={island.islandName}>
              {island.islandName}
            </option>
          ))}
        </optgroup>
      </select>
      <button onClick={addNameHandler}>追加</button> {/* 追加ボタンを追加 */}
      {selectError && (
        <div>
          <span className={styles.span}>{selectError}</span>
        </div>
      )}
      {selectedValues
        .reduce((rows, value, index) => {
          if (index % 3 === 0) {
            rows.push([]);
          }
          rows[rows.length - 1].push(
            <div key={index} className={styles.selectedValue}>
              <div className={styles.nameFlex}>
                <span className={styles.nowrap}>{value}</span>
                &nbsp;&nbsp;
                <button onClick={() => deleteNameHandler(index)}>×</button>
              </div>
            </div>,
          );
          return rows;
        }, [])
        .map((row, index) => (
          <div key={index} className={styles.row}>
            {row}
          </div>
        ))}
    </>
  );
}
