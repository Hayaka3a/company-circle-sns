import React from "react";
import { render, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import HandleInputChange from "../../../../components/comboBox/comboBoxTag/handleInputChange";

// テスト用のダミータグオプションデータ
const tagOptions = [
  { id: 1, Name: "タグ１", NameKana: "たぐ１" },
  { id: 2, Name: "タグ２", NameKana: "たぐ２" },
  { id: 3, Name: "タグ３", NameKana: "たぐ３" },
];

// テスト用のダミーnewOptionsデータ
const newOptions = [{ id: 4, Name: "タグ４", NameKana: "たぐ４" }];

// テスト用のダミーselectedValueデータ
const selectedValue = ["タグ４"];

describe("HandleInputChangeコンポーネント", () => {
  test("ユーザーの入力に基づいて選択肢がフィルタリングされ、サジェストオプションが更新されること", async () => {
    // テスト用のダミーsetSuggestedOptions関数
    const setSuggestedOptions = jest.fn();

    // テスト用のダミーsetInputValue関数
    const setInputValue = jest.fn();

    const { getByRole } = render(
      <HandleInputChange
        tagOptions={tagOptions}
        newOptions={newOptions}
        selectedValue={selectedValue}
        setSuggestedOptions={setSuggestedOptions}
        addHandler={() => {}}
        htmlFor="someId"
        inputValue="タグ１"
        setInputValue={setInputValue}
      />,
    );

    const inputElement = getByRole("textbox");

    // ユーザーの入力をシミュレート（inputの値を変更）
    fireEvent.change(inputElement, { target: { value: "新しいタグ" } });

    // setInputValueが新しい入力値で呼び出されたことを期待します
    expect(setInputValue).toHaveBeenCalledWith("新しいタグ");

    // SuggestedOptionsに新しいタグがないこと
    await waitFor(() => {
      expect(setSuggestedOptions).toHaveBeenCalledWith([]);
    });
  });

  test("inputタグがレンダリングされていること", () => {
    const dummyProps = {
      tagOptions: [
        { id: 1, Name: "タグ１", NameKana: "タグ１カナ" },
        { id: 2, Name: "タグ２", NameKana: "タグ２カナ" },
      ],
      newOptions: [],
      selectedValue: [],
      setSuggestedOptions: () => {},
      addHandler: () => {},
      htmlFor: "someId",
      inputValue: "Some Value",
      setInputValue: () => {},
    };

    const { getByRole } = render(<HandleInputChange {...dummyProps} />);

    const inputElement = getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });
});
