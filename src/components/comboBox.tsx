import React, { useState } from "react";

// Optionsには選択項目、htmlForには<label>のhtmlFor属性の値
export default function ComboBox({
  Options,
  htmlFor,
}: {
  Options: string[];
  htmlFor: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // ユーザーの入力に基づいて選択肢をフィルタリングする
    const filteredOptions = Options.filter((ops: string | string[]) =>
      ops.includes(value),
    );
    setOptions(filteredOptions);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setInputValue(selectedOption);
  };

  return (
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
  );
}
