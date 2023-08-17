import React, { useState } from "react";
import styles from "../../../styles/island/createIsland.module.css";

export default function HandleInputChange({
  tagOptions,
  newOptions,
  selectedValue,
  setSuggestedOptions,
  addHandler,
  htmlFor,
  inputValue,
  setInputValue,
}) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // ユーザーの入力に基づいて選択肢をフィルタリングする
    if (tagOptions) {
      const filteredOptions = tagOptions.filter(
        (ops) =>
          (ops.Name.includes(value) || ops.NameKana.includes(value)) &&
          // すでに追加された項目は除外する
          !newOptions.some((option) => option.Name === ops.Name) &&
          !selectedValue.includes(ops.Name),
      );
      const names = filteredOptions.map((option) => option.Name);

      setSuggestedOptions(names); // サジェストオプションを更新
    }
  };

  // 追加ボタンだけでなく、enterキーでもaddHandlerを発動させる
  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     addHandler();
  //   }
  // };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        maxLength={20}
        onChange={handleInputChange}
        className={styles.comboBoxUser}
        // onKeyDown={handleKeyDown}
        id={htmlFor}
      />
    </div>
  );
}
