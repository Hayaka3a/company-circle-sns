// 追加ボタン押されたらタグを追加
export const addNameHandler = (
    tempSelectedValues,
    selectedValues,
    islands,
    setIslandTags,
    setSelectedValues,
    setSelectError
) => {
    // 既に追加されている値を選択しようとした場合にエラーメッセージを表示
    const duplicates = tempSelectedValues.filter((selectedValue) =>
      selectedValues.some((value) => value === selectedValue),
    );
    if (duplicates.length > 0) {
      setSelectError("選択された値は既に追加されています。");
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

    // タグを追加
    setSelectedValues((prevSelectedValues) => [
      ...prevSelectedValues,
      ...tempSelectedValues,
    ]);

    setSelectError(""); // エラーメッセージをリセットする
};