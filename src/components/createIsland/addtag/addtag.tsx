import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/island/createIsland.module.css";
import HandleChangeName from "./handleChangeName";
import HandleChangeNameKana from "./handleChangeNameKana";

export default function AddTag({
  setTagNames,
}: {
  setTagNames: Dispatch<SetStateAction<{ Name: string; NameKana: string }[]>>;
}) {
  const [inputValue, setInputValue] = useState("");
  const [inputValueK, setInputValueK] = useState("");
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [tagNameError, setTagNameError] = useState("");
  const [tagNameKanaError, setTagNameKanaError] = useState("");

  //タグをどんどん追加していく
  const addHandler = () => {
    if (inputValue === "") {
      setTagNameError("タグ名を入力してください");
    } else if (inputValueK === "") {
      setTagNameKanaError("タグ名かなを入力してください");
    } else if (!/^[\u3040-\u309Fー]+$/u.test(inputValueK)) {
      setTagNameKanaError("ひらがなで入力してください");
    } else {
      setSelectedValue((value) => [...value, inputValue]);
      // タグデータ作成
      const newTag = { Name: inputValue, NameKana: inputValueK };
      setTagNames((prevTags) => [...prevTags, newTag]);

      setInputValue("");
      setInputValueK("");
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
      <div className={styles.tagInputs}>
        <label htmlFor="tagName">新しく追加するタグの名前：</label>
        <input
          type="text"
          value={inputValue}
          maxLength={20}
          onChange={HandleChangeName({
            tagNameError,
            setInputValue,
            setTagNameError,
          })}
          className={`${styles.Addtag} ${
            tagNameError ? styles.errorInputTg : ""
          }`}
          id="tagName"
        />
        {tagNameError && (
          <div>
            <span className={styles.spanTg}>{tagNameError}</span>
          </div>
        )}
        <label htmlFor="tagNameKana">タグ名かな：</label>
        <input
          type="text"
          value={inputValueK}
          onChange={HandleChangeNameKana({
            tagNameKanaError,
            setInputValueK,
            setTagNameKanaError,
          })}
          className={`${styles.Addtag} ${
            tagNameKanaError ? styles.errorInputTg : ""
          }`}
          id="tagNameKana"
        />
        {tagNameKanaError && (
          <div>
            <span className={styles.spanTg}>{tagNameKanaError}</span>
          </div>
        )}
      </div>
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
