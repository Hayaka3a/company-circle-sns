import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ComboBoxTag from "../components/comboBoxTag";
import { BrowserRouter } from "react-router-dom";

describe("ComboBoxTag", () => {
  const tagOptions = [
    { id: 1, Name: "Tag1", NameKana: "Tag1Kana" },
    { id: 2, Name: "Tag2", NameKana: "Tag2Kana" },
    { id: 3, Name: "Tag3", NameKana: "Tag3Kana" },
  ];

  it("should render the ComboBoxTag component", () => {
    // render(): コンポーネントが正しく描画され、表示される要素やふるまいをテストする
    render(
      <BrowserRouter>
        <ComboBoxTag
          tagOptions={tagOptions}
          htmlFor="test-input"
          chosenTag={null}
          setIslandTags={() => {}}
        />
        ,
      </BrowserRouter>,
    );

    // 必要な要素がレンダリングされていることを確認する
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();
  });

  it("should add a tag when the add button is clicked", () => {
    const setIslandTags = jest.fn();
    render(
      <ComboBoxTag
        tagOptions={tagOptions}
        htmlFor="test-input"
        chosenTag={null}
        setIslandTags={setIslandTags}
      />,
    );

    const inputElement = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: "追加" });

    // タグが正しく追加されることを確認する
    fireEvent.change(inputElement, { target: { value: "Tag1" } });
    fireEvent.click(addButton);

    expect(setIslandTags).toHaveBeenCalledWith([
      { id: 1, Name: "Tag1", NameKana: "Tag1Kana" },
    ]);

    // 入力値がクリアされることを確認する
    expect(inputElement.value).toBe("");
  });

  it("should delete a tag when the delete button is clicked", () => {
    const setIslandTags = jest.fn();
    render(
      <ComboBoxTag
        tagOptions={tagOptions}
        htmlFor="test-input"
        chosenTag={[
          { id: 1, Name: "Tag1", NameKana: "Tag1Kana" },
          { id: 2, Name: "Tag2", NameKana: "Tag2Kana" },
        ]}
        setIslandTags={setIslandTags}
      />,
    );

    const deleteButtons = screen.getAllByRole("button", { name: "×" });

    // タグが正しく削除されることを確認する
    fireEvent.click(deleteButtons[0]);

    expect(setIslandTags).toHaveBeenCalledWith([
      { id: 2, Name: "Tag2", NameKana: "Tag2Kana" },
    ]);
  });
});
