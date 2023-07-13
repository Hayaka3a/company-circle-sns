import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/island/createIsland.module.css";

// tagOptionsにはタグ配列、nameOptiosにはメンバー配列、htmlForには<label>のhtmlFor属性の値
export default function ComboBoxTag({
  tagOptions,
  htmlFor,
  chosenTag,
  setIslandTags,
}: {
  tagOptions: { id: number; Name: string; NameKana: string }[] | null;
  htmlFor: string;
  chosenTag: { id: number; Name: string; NameKana: string }[] | null;
  setIslandTags: Dispatch<
    SetStateAction<{ id: number; Name: string; NameKana: string }[]>
  >;
}) {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string[]>(
    chosenTag ? chosenTag.map((tag) => tag.Name) : [],
  );
  const [suggestedOptions, setSuggestedOptions] = useState<string[]>([]);

  const [newOptions, setNewOptions] = useState<
    { id: number; Name: string; NameKana: string }[]
  >(chosenTag ? chosenTag : []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // ユーザーの入力に基づいて選択肢をフィルタリングする
    if (tagOptions) {
      const filteredOptions = tagOptions.filter(
        (ops) =>
          (ops.Name.includes(value) || ops.NameKana.includes(value)) &&
          !newOptions.some((option) => option.Name === ops.Name) &&
          !selectedValue.includes(ops.Name),
      );
      const names = filteredOptions.map((option) => option.Name);

      setSuggestedOptions(names); // サジェストオプションを更新
    }
  };

  // タグをどんどん追加していく
  const addHandler = () => {
    if (inputValue !== "") {
      // タグに追加された名前と一致するnameOptionsのオブジェクトを探して、配列に追加していく
      const existingOption = tagOptions?.find((ops) => ops.Name === inputValue);
      if (existingOption) {
        // options[]にexistingOption{}を追加していく
        setSelectedValue((value) => [...value, inputValue]);
        setNewOptions((options) => [...options, existingOption]);
        const tags = [...newOptions, existingOption];
        setIslandTags(tags);

        setInputValue("");
        return setIslandTags;
      }
    }
  };

  // 追加ボタンだけでなく、enterキーでもaddHandlerを発動させる
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addHandler();
    }
  };

  // タグを削除する
  const deleteNameHandler = (index: number) => {
    setSelectedValue((value) => {
      const updatedValues = [...value];
      updatedValues.splice(index, 1);
      return updatedValues;
    });

    // 削除されたタグは再びサジェストオプションから選択できるようにする
    setNewOptions((options) => {
      const updatedOptions = [...options];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });

    const tags = [...newOptions];
    tags.splice(index, 1);
    setIslandTags(tags);
  };

  const handleSuggestionSelect = (option: string) => {
    setInputValue(option);
    setSuggestedOptions([]); // サジェストオプションをリセット

    // 入力値がサジェストオプションの候補に含まれている場合のみaddHandlerを実行する
    if (
      tagOptions.some(
        (ops) =>
          ops.Name === option &&
          !newOptions.some((option) => option.Name === ops.Name) &&
          !selectedValue.includes(ops.Name),
      )
    ) {
      addHandler();
    }
  };

  return (
    <div>
      <div className={styles.buttonSide}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={inputValue}
            maxLength={20}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            id={htmlFor}
            className={styles.comboBoxUser}
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
            <div key={index} className={styles.selectedValue}>
              <div className={styles.nameFlex}>
                <span className={styles.nowrap}>{value}</span>
                &nbsp;&nbsp;
                <button onClick={() => deleteNameHandler(index)}>×</button>
              </div>
            </div>,
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
