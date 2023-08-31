import React from "react";

export default function AddNameHandler({
  tempSelectedValues,
  selectedValues,
  islands,
  setIslandTags,
  setSelectedValues,
  setSelectError,
}) {
  const handleAddName = () => {
    const duplicates = tempSelectedValues.filter((selectedValue) =>
      selectedValues.some((value) => value === selectedValue),
    );

    if (duplicates.length > 0) {
      setSelectError("選択された値は既に追加されています");
      return;
    }

    tempSelectedValues.forEach((selectedValue) => {
      const existingOption = islands.find(
        (island) => island.islandName === selectedValue,
      );

      if (existingOption) {
        // 配列にオブジェクトを追加していく
        setIslandTags((prevTags) => [...prevTags, existingOption]);
      }
    });

    setSelectedValues((prevSelectedValues) => [
      ...prevSelectedValues,
      ...tempSelectedValues,
    ]);

    // エラーメッセージをリセット
    setSelectError("");
  };

  return <button onClick={handleAddName}>追加</button>;
}
