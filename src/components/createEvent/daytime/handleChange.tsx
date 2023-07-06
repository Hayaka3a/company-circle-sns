export default function HandleChange({
  setStartDate,
  setEndDate,
  error,
  setError,
  type,
}) {
  const handleChange = (e) => {
    const value = e.target.value;
    if (type === "start") {
      setStartDate(value);
    } else if (type === "end") {
      setEndDate(value);
    }
    // 一文字でも入力されたらエラー削除
    if (error) {
      setError("");
    }
  };

  return handleChange;
}
