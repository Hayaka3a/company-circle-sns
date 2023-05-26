import React, { useState } from "react";
import styles from "../styles/createIsland.module.css";

// Optionsには選択項目、htmlForには<label>のhtmlFor属性の値
export default function ComboBox({
  tagOptions,
  nameOptions,
  htmlFor,
}: {
  tagOptions: { id: number; Name: string; NameKana: string }[] | null;
  nameOptions:
    | { id: number; Name: string; NameKana: string; NameKanaJ: string }[]
    | null;
  htmlFor: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [suggestedOptions, setSuggestedOptions] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // ユーザーの入力に基づいて選択肢をフィルタリングする
    // ユーザー選択
    if (nameOptions) {
      const filteredOptions = nameOptions.filter(
        (ops) =>
          ops.Name.includes(value) ||
          ops.NameKana.includes(value) ||
          ops.NameKanaJ.includes(value),
      );
      const names = filteredOptions.map((ops) => ops.Name);
      setOptions(names);
      setSuggestedOptions(names); // サジェストオプションを更新
      // タグ選択
    } else if (tagOptions) {
      const filteredOptions = tagOptions.filter(
        (ops) => ops.Name.includes(value) || ops.NameKana.includes(value),
      );
      const names = filteredOptions.map((option) => option.Name);
      setOptions(names);
      setSuggestedOptions(names); // サジェストオプションを更新
    }
  };

  // // 選択されてた値をinputタグに追加していく
  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedOption = event.target.value;
  //   setInputValue(selectedOption);
  // };

  // タグをどんどん追加していく
  const addHandler = () => {
    if (inputValue !== "") {
      console.log(selectedValue);
      // スプレッド演算子を用いてコピー作成し、配列作成
      // reactではstate更新する際、コピー作成しそれを更新することで、変更を検出して再レンダリングする
      setSelectedValue((value) => [...value, inputValue]);
      setInputValue("");
    }
  };

  // タグを削除する
  const deleteNameHandler = (index: number) => {
    setSelectedValue((value) => {
      const updatedValues = [...value];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
  };

  const handleSuggestionSelect = (option: string) => {
    setInputValue(option);
    setSuggestedOptions([]); // サジェストオプションをリセット
  };

  return (
    <div>
      <div className={styles.buttonSide}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            id={htmlFor}
          />
          {/* サジェストオプションを表示 */}
          {inputValue !== "" && suggestedOptions.length > 0 && (
            <ul className={styles.suggestionList}>
              {suggestedOptions.map((option) => (
                <li
                  key={option}
                  className={styles.li}
                  onClick={() => handleSuggestionSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button onClick={addHandler} className={styles.addButton}>
          追加
        </button>
      </div>
      {/* タグの追加 */}
      {selectedValue
        .reduce((rows, value, index) => {
          if (index % 3 === 0) {
            rows.push([]);
          }
          rows[rows.length - 1].push(
            <p key={index} className={styles.selectedValue}>
              <div className={styles.nameFlex}>
                <span className={styles.nowrap}>{value}</span>
                &nbsp;&nbsp;
                <button onClick={() => deleteNameHandler(index)}>×</button>
              </div>
            </p>,
          );
          return rows;
        }, [])
        .map((row, index) => (
          <div key={index} className={styles.row}>
            {row}
          </div>
        ))}
    </div>
  );
}
