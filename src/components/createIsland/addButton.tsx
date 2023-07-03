import React from "react";
import styles from "../../styles/island/createIsland.module.css";

function AddButton({
  inputValue,
  inputValueK,
  setTagNames,
  setSelectedValue,
  setInputValue,
  setInputValueK,
  setTagNameError,
  setTagNameKanaError,
}) {
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

  return (
    <button onClick={addHandler} className={styles.addButton}>
      追加
    </button>
  );
}

export default AddButton;
