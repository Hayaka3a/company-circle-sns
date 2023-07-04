// 一文字でも入力されたらエラー解消

export default function HandleChange({ setDetail, error, setError }) {
  const handleEventDetailChange = (e) => {
    setDetail(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (error) {
      setError("");
    }
  };

  return handleEventDetailChange;
}
