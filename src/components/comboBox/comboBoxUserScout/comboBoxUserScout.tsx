import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/island/createIsland.module.css";
import HandleInputChange from "../comboBoxUser/handleInputChange";
import AddHandler from "../comboBoxTag/addHandler";
import SuggestionSelectHandler from "../comboBoxTag/handleSuggestionSelect";
import DeleteHandler from "../comboBoxTag/deleteHandler";

// tagOptionsにはタグ配列、nameOptiosにはメンバー配列、htmlForには<label>のhtmlFor属性の値
export default function ComboBoxUserScout({
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

  return (
    <div>
      <div className={styles.buttonSide}>
        <div className={styles.inputContainer}>
          <HandleInputChange
            nameOptions={nameOptions}
            newOptions={newOptions}
            selectedValue={selectedValue}
            setSuggestedOptions={setSuggestedOptions}
            addHandler={AddHandler}
            inputValue={inputValue}
            setInputValue={setInputValue}
            htmlFor={htmlFor}
          />
          {/* サジェストオプションを表示 */}
          {inputValue !== "" && suggestedOptions.length > 0 && (
            <ul className={styles.suggestionList}>
              {suggestedOptions.map((option) => (
                <SuggestionSelectHandler
                  option={option}
                  setInputValue={setInputValue}
                  setSuggestedOptions={setSuggestedOptions}
                  tagOptions={null}
                  newOptions={newOptions}
                  selectedValue={selectedValue}
                  category={"userScout"}
                  nameOptions={nameOptions}
                  setSelectedValue={setSelectedValue}
                  setNewOptions={setNewOptions}
                  setIslandTags={null}
                  setIslandMembers={setIslandMembers}
                  setError={setError}
                />
              ))}
            </ul>
          )}
        </div>
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
                <DeleteHandler
                  index={index}
                  setSelectedValue={setSelectedValue}
                  setNewOptions={setNewOptions}
                  setIslandTags={null}
                  setIslandMembers={setIslandMembers}
                  category={"userScout"}
                  newOptions={newOptions}
                  setError={setError}
                />{" "}
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
