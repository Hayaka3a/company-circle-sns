import React from "react";
import styles from "../../../styles/island/createIsland.module.css";
import AddHandler from "./addHandler";

export default function SuggestionSelectHandler({
  option,
  setInputValue,
  setSuggestedOptions,
  tagOptions,
  newOptions,
  selectedValue,
  category,
  nameOptions,
  setSelectedValue,
  setNewOptions,
  setIslandTags,
  setIslandMembers,
  setError,
}) {
  const handleSuggestionSelect = () => {
    setInputValue(option);
    setSuggestedOptions([]); // サジェストオプションをリセット

    // 入力値がサジェストオプションの候補に含まれている場合のみaddHandlerを実行する
    if (category === "tag") {
      if (
        tagOptions.some(
          (ops) =>
            ops.Name === option &&
            // newOptions配列の中にすでに同じNameプロパティを持つ要素が存在しないこと
            !newOptions.some((option) => option.Name === ops.Name) &&
            // selectedValue配列にも含まれていないこと
            !selectedValue.includes(ops.Name),
        )
      ) {
        AddHandler({
          inputValue: option,
          setInputValue: setInputValue,
          tagOptions: tagOptions,
          newOptions: newOptions,
          setSelectedValue: setSelectedValue,
          setNewOptions: setNewOptions,
          setIslandTags: setIslandTags,
          nameOptions: null,
          setIslandMembers: null,
          category: category,
          setError: null,
        });
      }
    }
    if (category === "user") {
      if (
        nameOptions.some(
          (ops) =>
            ops.Name === option &&
            !newOptions.some((option) => option.Name === ops.Name) &&
            !selectedValue.includes(ops.Name),
        )
      ) {
        AddHandler({
          inputValue: option,
          setInputValue: setInputValue,
          tagOptions: tagOptions,
          newOptions: newOptions,
          setSelectedValue: setSelectedValue,
          setNewOptions: setNewOptions,
          setIslandTags: null,
          nameOptions: nameOptions,
          setIslandMembers: setIslandMembers,
          category: category,
          setError: null,
        });
      }
    }
    if (category === "userScout") {
      if (
        nameOptions.some(
          (ops) =>
            ops.Name === option &&
            !newOptions.some((option) => option.Name === ops.Name) &&
            !selectedValue.includes(ops.Name),
        )
      ) {
        AddHandler({
          inputValue: option,
          setInputValue: setInputValue,
          tagOptions: tagOptions,
          newOptions: newOptions,
          setSelectedValue: setSelectedValue,
          setNewOptions: setNewOptions,
          setIslandTags: null,
          nameOptions: nameOptions,
          setIslandMembers: setIslandMembers,
          category: category,
          setError: setError,
        });
      }
    }
  };

  return (
    <li key={option} className={styles.li} onClick={handleSuggestionSelect}>
      {option}
    </li>
  );
}
