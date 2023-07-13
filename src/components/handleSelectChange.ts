// 選択項目
export const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, setTempSelectedValues) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setTempSelectedValues(selectedOptions); // 一時的な選択値を更新する
};