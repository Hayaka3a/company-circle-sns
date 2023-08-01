export default function HandleSelectChange(setTempSelectedValues) {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setTempSelectedValues(selectedOptions); // 一時的な選択値を更新する
  };
  return handleSelectChange;
}
