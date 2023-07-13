// 一文字でも入力されたらエラー解消
// eventでも使用

export default function HandleDetailChange({ setDetail, error, setError }) {
  const handleIslandDetailChange = (e) => {
    setDetail(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (error) {
      setError("");
    }
  };

  return handleIslandDetailChange;
}
