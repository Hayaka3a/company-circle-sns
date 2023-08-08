import React from "react";
import { render } from "@testing-library/react";
import ComboBoxUser from "../../../../components/comboBox/comboBoxUserScout/comboBoxUserScout";

jest.mock(
  "../../../../components/comboBox/comboBoxTag/addHandler",
  () => () => <div>AddHandler mock</div>,
);

describe("ComboBoxUserコンポーネント", () => {
  test("追加ボタンをレンダリングできること", () => {
    const nameOptions = [
      {
        id: 1,
        Name: "山田太郎",
        NameKana: "ヤマダタロウ",
        NameKanaJ: "やまだたろう",
      },
      {
        id: 2,
        Name: "田中花子",
        NameKana: "タナカハナコ",
        NameKanaJ: "たなかはなこ",
      },
    ];

    const chosenTag = [
      {
        id: 1,
        Name: "山田太郎",
        NameKana: "ヤマダタロウ",
        NameKanaJ: "やまだたろう",
      },
      {
        id: 2,
        Name: "田中花子",
        NameKana: "タナカハナコ",
        NameKanaJ: "たなかはなこ",
      },
    ];

    const { getByText } = render(
      <ComboBoxUser
        nameOptions={nameOptions}
        htmlFor="someId"
        chosenTag={chosenTag}
        setIslandMembers={() => {}}
      />,
    );

    const addButton = getByText("追加");
    expect(addButton).toBeInTheDocument();
  });
});
