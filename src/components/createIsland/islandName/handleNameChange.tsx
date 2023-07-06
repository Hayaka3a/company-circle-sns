// 一文字でもinputタグに入力されたらエラーを解消

export default function HandleNameChange({
  NameError,
  setName,
  setNameError,
  setNameAlreadyError,
  nameAlreadyError,
}) {
  const handleNameChange = (e) => {
    setName(e.target.value);
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
