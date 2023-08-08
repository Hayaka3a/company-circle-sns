export default function HandleInputChange(
  event,
  setEmptyChara,
  setNotExist,
  setInputValue
) {
  const value = event.target.value;
  if (/\s/.test(value)) {
    setEmptyChara("空白文字は入力できません");
    setNotExist("");
  } else {
    setInputValue(value);
    setEmptyChara("");
  }
}
