// 一文字でも入力されたらエラー解消

export default function HandleNameChange({
  setEventName,
  NameError,
  setNameError,
  nameAlreadyError,
  setNameAlreadyError,
}) {
  const handleNameChange = (e) => {
    setEventName(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (NameError) {
      setNameError("");
    }
    // 重複エラーも非表示にする
    if (nameAlreadyError) {
      setNameAlreadyError("");
    }
  };

  return handleNameChange;
}
