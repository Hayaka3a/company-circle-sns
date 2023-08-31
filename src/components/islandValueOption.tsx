import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { supabase } from "../createClient";
import styles from "../styles/island/createIsland.module.css";
import FetchIsland from "./fetchIsland";
import { handleSelectChange } from "./handleSelectChange";
import { addNameHandler } from "./addNameHandler";
import { deleteNameHandler } from "./deleteNameHandler";
import HandleHideEventJoin from "./handleHideEventJoin";
import SelectedIslandJoin from "./selectedIslandJoin";

export default function IslandValueOption({
  islandJoinID,
  setIslandTags,
  fetchEventID,
  setEventJoin,
  eventJoin,
  setIslandJoinID,
}: {
  islandJoinID: string;
  setIslandTags: Dispatch<SetStateAction<{ id: number; islandName: string }[]>>;
  fetchEventID: string;
  setEventJoin: Dispatch<SetStateAction<string>>;
  eventJoin: string;
  setIslandJoinID: Dispatch<SetStateAction<string>>;
}) {
  const [islands, setIslands] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [tempSelectedValues, setTempSelectedValues] = useState([]); // 一時的な選択値を格納する配列
  const [selectError, setSelectError] = useState("");
  const [selectedIslandNames, setSelectedIslandNames] = useState([]); // 既に選択されている島の名前を保持

  const islandID_N = Number(islandJoinID);


  // selectタグの選択項目を取得
  const fetchIslandData = async () => {
    await FetchIsland(setIslands, islandJoinID);
  };

  useEffect(() => {
    fetchIslandData();
  }, []);

  // 選択項目
  const handleSelectChangeData = (e) => {
    handleSelectChange(e, setTempSelectedValues); 
  } ;

// 追加ボタン押されたらタグを追加
const addNameHandlerData =  async () => {
    addNameHandler(
    tempSelectedValues,
    selectedValues,
    islands,
    setIslandTags,
    setSelectedValues,
    setSelectError
  ); // addNameHandler関数を呼び出す
};

  // タグの削除
  const deleteNameHandlerData = (index) => {
    deleteNameHandler(
      index,
      selectedValues,
      setSelectedValues,
      islands,
      setIslandTags
    ); // deleteNameHandler関数を呼び出す
  };

  return (
    <>
      <div>共同開催する島がある場合は、ここから選択してください</div>
      <select
        name="islands"
        size={4}
        onChange={handleSelectChangeData} // 選択が変更されたときの処理を追加
        className={styles.selectIsland}
      >
        <optgroup label="島名" className={styles.islansTitle}>
          {islands.map((island) => (
            <option
              key={island.islandName}
              value={island.islandName}
              className={styles.option}
            >
              {island.islandName}
            </option>
          ))}
        </optgroup>
      </select>
      <button onClick={addNameHandlerData} className={styles.add}>
        追加
      </button>
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
                <button
                    onClick={() => deleteNameHandlerData(index)}
                    className={styles.delBtn}
                >
                    ×
                </button>
                </div>
            </div>
            );
            return rows;
        }, [])
        .map((row, index) => (
            <div key={index} className={styles.row}>
            {row}
            </div>
      ))}
      <SelectedIslandJoin 
        fetchEventID={fetchEventID}
        setIslandJoinID={setIslandJoinID}
        setEventJoin={setEventJoin}
      />
    </>
  );
}
