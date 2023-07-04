import React from "react";

export default function AddButton({
  inputValue,
  inputValueK,
  setTagNames,
  setSelectedValue,
  setInputValue,
  setInputValueK,
  setTagNameError,
  setTagNameKanaError,
}) {
  // タグをどんどん追加していく
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

  addHandler();
  return null;
}
