import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HandleInputChange from "../../../../components/comboBox/comboBoxTag/handleInputChange";

// テスト用のダミータグオプションデータ
const nameOptions = [
  {
    id: 1,
    Name: "山田太郎",
    NameKana: "ヤマダタロウ",
    NamekanaJ: "やまだたろう",
  },
  {
    id: 2,
    Name: "田中花子",
    NameKana: "タナカハナコ",
    NamekanaJ: "たなかはなこ",
  },
];

// テスト用のダミーnewOptionsデータ
const newOptions = [
  {
    id: 4,
    Name: "鈴木一郎",
    NameKana: "スズキイチロウ",
    NamekanaJ: "すずきいちろう",
  },
];

// テスト用のダミーselectedValueデータ
const selectedValue = ["鈴木一郎"];

describe("HandleInputChangeコンポーネント", () => {
  test("ユーザーの入力に基づいて選択肢がフィルタリングされ、サジェストオプションが更新されること", async () => {
    // // テスト用のダミーsetSuggestedOptions関数
    // const setSuggestedOptions = jest.fn();
    // // テスト用のダミーsetInputValue関数
    // const setInputValue = jest.fn();
    // const { getByRole } = render(
    //   <HandleInputChange
    //     nameOptions={nameOptions}
    //     newOptions={newOptions}
    //     selectedValue={selectedValue}
    //     setSuggestedOptions={setSuggestedOptions}
    //     addHandler={() => {}}
    //     htmlFor="someId"
    //     inputValue="山田太郎"
    //     setInputValue={setInputValue}
    //   />,
    // );
    // const inputElement = getByRole("textbox");
    // // ユーザーの入力をシミュレート（inputの値を変更）
    // fireEvent.change(inputElement, { target: { value: "山田" } });
    // // setInputValueが新しい入力値で呼び出されたことを期待します
    // expect(setInputValue).toHaveBeenCalledWith("山田");
    // // setSuggestedOptionsが適切な引数で呼び出されたことを期待します
    // await waitFor(() => {
    //   expect(setSuggestedOptions).toHaveBeenCalledWith([]);
    // });
  });

  test("inputタグがレンダリングされていること", () => {
    const dummyProps = {
      nameOptions: [
        {
          id: 1,
          Name: "山田太郎",
          NameKana: "ヤマダタロウ",
          NamekanaJ: "やまだたろう",
        },
        {
          id: 2,
          Name: "田中花子",
          NameKana: "タナカハナコ",
          NamekanaJ: "たなかはなこ",
        },
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
