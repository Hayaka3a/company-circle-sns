export const scoutMessageBlur = ({ message, setmessageError }) => {
  if (message.trim() === "") {
    setmessageError("※コメントは入力必須項目です");
  } else {
    setmessageError("");
  }
};
