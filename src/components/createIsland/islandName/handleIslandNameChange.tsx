// 一文字でもinputタグに入力されたらエラーを解消

export default function HandleIslandNameChange({
  islandNameError,
  setIslandName,
  setIslandNameError,
  setNameAlreadyError,
  nameAlreadyError,
}) {
  const handleIslandNameChange = (e) => {
    setIslandName(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (islandNameError) {
      setIslandNameError("");
    }
    // 重複エラーも非表示にする
    if (nameAlreadyError) {
      setNameAlreadyError("");
    }
  };

  return handleIslandNameChange;
}
