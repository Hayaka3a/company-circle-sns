import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { supabase } from "../../createClient";
import styles from "../../styles/island/createIsland.module.css";
import FetchIslands from "./fetchIslands";
import HandleSelectChange from "./handleSelectChange";
import AddNameHandler from "./addNameHandler";
import DeleteNameHandler from "./deleteNameHandler";

export default function SelectIsland({
  islandIDs,
  setIslandTags,
}: {
  islandIDs: string[];
  setIslandTags: Dispatch<SetStateAction<{ id: number; islandName: string }[]>>;
}) {
  const [islands, setIslands] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [tempSelectedValues, setTempSelectedValues] = useState([]); // 一時的な選択値を格納する配列
  const [selectError, setSelectError] = useState("");

  useEffect(() => {
    // selectタグの選択項目を取得
    FetchIslands(islandIDs, setIslands);
  }, []);

  // 選択項目
  const handleSelectChange = HandleSelectChange(setTempSelectedValues);

  return (
    <>
      <div>サークルを選択してください</div>
      <select
        name="islands"
        multiple
        size={4}
        onChange={(e) => handleSelectChange(e)}
      >
        <optgroup label="島名">
          {islands.map((island) => (
            <option
              key={island.islandName}
              value={island.islandName}
              disabled={
                selectedValues.includes(island.islandName) ||
                islandIDs.includes(island.id.toString())
              }
            >
              {island.islandName}
            </option>
          ))}
        </optgroup>
      </select>
      <AddNameHandler
        tempSelectedValues={tempSelectedValues}
        selectedValues={selectedValues}
        islands={islands}
        setIslandTags={setIslandTags}
        setSelectedValues={setSelectedValues}
        setSelectError={setSelectError}
      />
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
                <DeleteNameHandler
                  selectedValues={selectedValues}
                  islands={islands}
                  setSelectedValues={setSelectedValues}
                  setIslandTags={setIslandTags}
                  index={index}
                />{" "}
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
