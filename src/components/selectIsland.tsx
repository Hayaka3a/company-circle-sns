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
  const [tempSelectedValues, setTempSelectedValues] = useState([]); // 一時的な選択値を格納する配列を追加

  const islandID_N = Number(islandID);

  // selectタグの選択項目を取得
  useEffect(() => {
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
  const addNameHandler = () => {
    setSelectedValues((prevSelectedValues) => [
      ...prevSelectedValues,
      ...tempSelectedValues,
    ]);

    setTempSelectedValues([]); // 一時的な選択値をリセットする
  };

  //   タグの削除
  const deleteNameHandler = (index) => {
    const updatedValues = [...selectedValues];
    updatedValues.splice(index, 1);
    setSelectedValues(updatedValues);
  };
  return (
    <>
      <p>共同開催する島がある場合は、ここから選択してください</p>
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
      {selectedValues
        .reduce((rows, value, index) => {
          if (index % 3 === 0) {
            rows.push([]);
          }
          rows[rows.length - 1].push(
            <p key={index} className={styles.selectedValue}>
              <div className={styles.nameFlex}>
                <span className={styles.nowrap}>{value}</span>
                &nbsp;&nbsp;
                <button onClick={() => deleteNameHandler(index)}>×</button>
              </div>
            </p>,
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
