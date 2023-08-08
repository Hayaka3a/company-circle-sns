import React from "react";
import { render } from "@testing-library/react";
import SuggestionSelectHandler from "../../../../components/comboBox/comboBoxTag/handleSuggestionSelect";

// テスト用のダミーデータ
const option = "タグ１";
const setInputValue = jest.fn();
const setSuggestedOptions = jest.fn();
const tagOptions = [
  { id: 1, Name: "タグ１", NameKana: "たぐ１" },
  { id: 2, Name: "タグ２", NameKana: "たぐ２" },
];
const newOptions = [{ id: 4, Name: "タグ４", NameKana: "たぐ４" }];
const selectedValue = ["タグ４"];
const category = "tag";
const nameOptions = null;
const setSelectedValue = jest.fn();
const setNewOptions = jest.fn();
const setIslandTags = jest.fn();
const setIslandMembers = jest.fn();
const setError = jest.fn();

test("SuggestionSelectHandlerコンポーネントが表示されること", () => {
  const { getByText } = render(
    <SuggestionSelectHandler
      option={option}
      setInputValue={setInputValue}
      setSuggestedOptions={setSuggestedOptions}
      tagOptions={tagOptions}
      newOptions={newOptions}
      selectedValue={selectedValue}
      category={category}
      nameOptions={nameOptions}
      setSelectedValue={setSelectedValue}
      setNewOptions={setNewOptions}
      setIslandTags={setIslandTags}
      setIslandMembers={setIslandMembers}
      setError={setError}
    />,
  );

  const liElement = getByText(option);
  expect(liElement).toBeInTheDocument();
});
