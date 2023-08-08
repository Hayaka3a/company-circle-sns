import React from "react";
import { render } from "@testing-library/react";
import ComboBoxTag from "../../../../components/comboBox/comboBoxTag/comboBoxTag";

jest.mock(
  "../../../../components/comboBox/comboBoxTag/addHandler",
  () => () => <div>AddHandler mock</div>,
);

describe("ComboBoxTagコンポーネント", () => {
  test("追加ボタンをレンダリングできること", () => {
    // Dummy tag options data for the test
    const tagOptions = [
      { id: 1, Name: "Tag1", NameKana: "Tag1Kana" },
      { id: 2, Name: "Tag2", NameKana: "Tag2Kana" },
    ];

    // Dummy chosenTag data for the test
    const chosenTag = [
      { id: 1, Name: "Tag1", NameKana: "Tag1Kana" },
      { id: 2, Name: "Tag2", NameKana: "Tag2Kana" },
    ];

    const { getByText } = render(
      <ComboBoxTag
        tagOptions={tagOptions}
        htmlFor="someId"
        chosenTag={chosenTag}
        setIslandTags={() => {}}
      />,
    );

    const addButton = getByText("追加");
    expect(addButton).toBeInTheDocument();
  });
});
