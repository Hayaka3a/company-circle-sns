// 一文字でもinputタグに入力されたらエラーを解消

export default function HandleIslandNameChange({
  setEmptyChara,
  setNotExist,
  setInputValue,
}) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/\s/.test(value)) {
      setEmptyChara("空白文字は入力できません");
      setNotExist("");
    } else {
      setInputValue(value);
      setEmptyChara("");
    }
  };

  return handleInputChange;
}
