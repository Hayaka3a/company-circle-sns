import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddTag from "../../../../components/createIsland/addtag/addtag";

describe("AddTag", () => {
  it("should render input fields and button", () => {
    const setTagNames = jest.fn();

    const { getByLabelText, getByText } = render(
      <AddTag setTagNames={setTagNames} />,
    );

    const tagNameInput = getByLabelText("新しく追加するタグの名前：");
    const tagNameKanaInput = getByLabelText("タグ名かな：");
    const addButton = getByText("追加");

    expect(tagNameInput).toBeInTheDocument();
    expect(tagNameKanaInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });
});
