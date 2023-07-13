import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/island/createIsland.module.css";

// tagOptionsにはタグ配列、nameOptiosにはメンバー配列、htmlForには<label>のhtmlFor属性の値
export default function ComboBoxUser({
  nameOptions,
  htmlFor,
  setIslandMembers,
}: {
  nameOptions:
    | { id: number; Name: string; NameKana: string; NameKanaJ: string }[];
  htmlFor: string;
  setIslandMembers: Dispatch<
    SetStateAction<
      { id: number; Name: string; NameKana: string; NameKanaJ: string }[]
    >
  >;
}) {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [suggestedOptions, setSuggestedOptions] = useState<string[]>([]);
  const [newOptions, setNewOptions] = useState<
    { id: number; Name: string; NameKana: string; NameKanaJ: string }[]
  >([]);
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // ユーザーの入力に基づいて選択肢をフィルタリングする
    // ユーザー選択
    if (nameOptions) {
      const filteredOptions = nameOptions.filter(
        (ops) =>
          (ops.Name.includes(value) ||
            ops.NameKana.includes(value) ||
            ops.NameKanaJ.includes(value)) &&
          // すでに追加された人は除外する
          !newOptions.some((option) => option.Name === ops.Name) &&
          !selectedValue.includes(ops.Name),
      );
      const names = filteredOptions.map((ops) => ops.Name);

      setSuggestedOptions(names); // サジェストオプションを更新
    }
  };

  // タグをどんどん追加していく
  const addHandler = () => {
    if (inputValue !== "") {
      // タグに追加された名前と一致するnameOptionsのオブジェクトを探して、配列に追加していく

      const existingOption = nameOptions?.find(
        (ops) => ops.Name === inputValue,
      );
      if (existingOption) {
        // options[]にexistingOption{}を追加していく（スプレッド演算子）
        // reactではstate更新する際、コピー作成しそれを更新することで、変更を検出して再レンダリングする
        setSelectedValue((value) => [...value, inputValue]);
        setNewOptions((options) => [...options, existingOption]);
        const members = [...newOptions, existingOption];

        if (members.length > 1) {
          setError("送信先は1人のみ選択可能です。");
        } else {
          setIslandMembers(members);
        }

        setInputValue("");
        return setIslandMembers;
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

    const users = [...newOptions];
    users.splice(index, 1);
    setIslandMembers(users);
    setError("");
  };

  const handleSuggestionSelect = (option: string) => {
    setInputValue(option);
    setSuggestedOptions([]); // サジェストオプションをリセット

    // 入力値がサジェストオプションの候補に含まれている場合のみaddHandlerを実行する
    if (
      nameOptions.some(
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
            maxLength={24}
            value={inputValue}
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
      {error && (
        <div>
          <span className={styles.span}>{error}</span>
        </div>
      )}
    </div>
  );
}
