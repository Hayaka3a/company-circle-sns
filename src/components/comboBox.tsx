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
      // タグ選択
    } else if (tagOptions) {
      const filteredOptions = tagOptions.filter(
        (ops) => ops.Name.includes(value) || ops.NameKana.includes(value),
      );
      const names = filteredOptions.map((option) => option.Name);
      setOptions(names);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setInputValue(selectedOption);
  };

  const addHandler = () => {
    if (inputValue !== "") {
      setSelectedValue((prevValues) => [...prevValues, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          id={htmlFor}
        />
        <select value={inputValue} onChange={handleSelectChange}>
          <option value="">選択</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button onClick={addHandler}>追加</button>
      {/* {selectedValue.map((value, index) => (
        <div className={styles.name} key={index}>
          {value}
        </div>
      ))} */}
      {selectedValue
        .reduce((rows, value, index) => {
          if (index % 3 === 0) {
            rows.push([]);
          }
          rows[rows.length - 1].push(
            <p key={index} className={styles.selectedValue}>
              {value}
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
