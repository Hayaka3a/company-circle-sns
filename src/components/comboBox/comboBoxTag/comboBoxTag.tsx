import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/island/createIsland.module.css";
import HandleInputChange from "./handleInputChange";
import AddHandler from "./addHandler";
import DeleteHandler from "./deleteHandler";
import SuggestionSelectHandler from "./handleSuggestionSelect";

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

  return (
    <div>
      <div className={styles.buttonSide}>
        <div className={styles.inputContainer}>
          <HandleInputChange
            tagOptions={tagOptions}
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
                  tagOptions={tagOptions}
                  newOptions={newOptions}
                  selectedValue={selectedValue}
                  category={"tag"}
                  nameOptions={null}
                  setSelectedValue={setSelectedValue}
                  setNewOptions={setNewOptions}
                  setIslandTags={setIslandTags}
                  setIslandMembers={null}
                  setError={null}
                />
              ))}
            </ul>
          )}
        </div>

        <button onClick={() => AddHandler}>追加</button>
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
                  setIslandTags={setIslandTags}
                  setIslandMembers={null}
                  category={"tag"}
                  newOptions={newOptions}
                  setError={null}
                />
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
