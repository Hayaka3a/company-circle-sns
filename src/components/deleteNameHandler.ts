// タグの削除
export const deleteNameHandler = (
    index, 
    selectedValues, 
    setSelectedValues, 
    islands, 
    setIslandTags
    ) => {
    // 削除されたタグの名前を配列の中へ格納
    const updatedValues = [...selectedValues];
    // その配列を空にする
    updatedValues.splice(index, 1);
    setSelectedValues(updatedValues);

    // 削除されたタグのオブジェクトを取り出す
    const deletedOption = islands.find(
      (island) => island.islandName === selectedValues[index],
    );

    if (deletedOption) {
      // フィルタリングして排除する
      setIslandTags((prevTags) =>
        prevTags.filter((tag) => tag.id !== deletedOption.id),
      );
    }
};