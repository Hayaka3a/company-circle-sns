import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/island/createIsland.module.css";

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

  // タグ名（一文字でも入力されたらエラー表示削除）
  const handleChangeName = (e) => {
    setInputValue(e.target.value);
    noErrorHandlerName(e);
  };

  const noErrorHandlerName = (e) => {
    setInputValue(e.target.value);
    if (tagNameError) {
      setTagNameError("");
    }
  };

  // タグ名かな（一文字でも入力されたらエラー表示削除
  const handleChangeNameKana = (e) => {
    setInputValueK(e.target.value);
    noErrorHandlerKana(e);
  };

  const noErrorHandlerKana = (e) => {
    setInputValueK(e.target.value);
    if (tagNameKanaError) {
      setTagNameKanaError("");
    }
  };

  //タグをどんどん追加していく
  const addHandler = () => {
    if (inputValue == "") {
      setTagNameError("タグ名を入力してください");
    }
    if (inputValueK === "") {
      setTagNameKanaError("タグ名かなを入力してください");
    }
    if (/^[ァ-ヶーa-zA-Z0-9]+$/.test(inputValueK)) {
      setTagNameKanaError("ひらがなで入力してください");
    }
    if (
      inputValue !== "" &&
      inputValueK !== "" &&
      !/^[ァ-ヶーa-zA-Z0-9]+$/.test(inputValueK)
    ) {
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
          onChange={handleChangeName}
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
          onChange={handleChangeNameKana}
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
