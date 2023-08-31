import React from "react";

export default function AddHandler({
  inputValue,
  setInputValue,
  tagOptions,
  newOptions,
  setSelectedValue,
  setNewOptions,
  setIslandTags,
  nameOptions,
  setIslandMembers,
  category,
  setError,
}) {
  const addHandler = () => {
    if (tagOptions) {
      if (inputValue !== "") {
        // タグに追加された名前と一致するnameOptionsのオブジェクトを探して、配列に追加していく
        const existingOption = tagOptions?.find(
          (ops) => ops.Name === inputValue,
        );
        if (existingOption) {
          setSelectedValue((value) => [...value, inputValue]);
          setNewOptions((options) => [...options, existingOption]);
          const tags = [...newOptions, existingOption];
          setIslandTags(tags);

          setInputValue("");
        }
      }
    }
    if (nameOptions && category !== "userScout") {
      if (inputValue !== "") {
        // タグに追加された名前と一致するnameOptionsのオブジェクトを探して、配列に追加していく
        const existingOption = nameOptions?.find(
          (ops) => ops.Name === inputValue,
        );
        if (existingOption) {
          // options[]にexistingOption{}を追加していく（スプレッド演算子）
          // reactではstate更新する際、コピー作成しそれを更新することで、変更を検出して再レンダリングする
          setSelectedValue((value) => [...value, inputValue]);
          setNewOptions((options) => [...options, existingOption]);
          const members = [...newOptions, existingOption];
          setIslandMembers(members);

          setInputValue("");
        }
      }
    }
    if (nameOptions && category === "userScout") {
      if (inputValue !== "") {
        const existingOption = nameOptions?.find(
          (ops) => ops.Name === inputValue,
        );
        if (existingOption) {
          setSelectedValue((value) => [...value, inputValue]);
          setNewOptions((options) => [...options, existingOption]);
          const members = [...newOptions, existingOption];

          if (members.length > 1) {
            setError("送信先は1人のみ選択可能です");
          } else {
            setIslandMembers(members);
          }

          setInputValue("");
          return setIslandMembers;
        }
      }
    }
  };
  addHandler();

  return null;
}
