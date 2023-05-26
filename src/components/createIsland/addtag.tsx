import { useState } from "react";
import styles from "../../styles/createIsland.module.css";

export default function AddTag() {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  //タグをどんどん追加していく
  const addHandler = () => {
    if (inputValue !== "") {
      setSelectedValue((value) => [...value, inputValue]);
      setInputValue("");
    }
  };

  // タグを削除する
  const deleteNameHandler = (index: number) => {
    setSelectedValue((value) => {
      const updatedValues = [...value];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={styles.inputA}
      />
      <button onClick={addHandler} className={styles.addButton}>
        追加
      </button>
      {/* タグの追加 */}
      {selectedValue
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
