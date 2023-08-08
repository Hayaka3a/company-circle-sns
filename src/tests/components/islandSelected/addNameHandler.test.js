import React from "react";
import { render, screen } from "@testing-library/react";
import AddNameHandler from "../../../components/islandSelected/addNameHandler";

describe("AddNameHandlerコンポーネント", () => {
  test("ボタンが表示されていること", () => {
    const tempSelectedValues = ["島A", "島B"];
    const selectedValues = ["島C"];
    const islands = [
      { id: 1, islandName: "島A" },
      { id: 2, islandName: "島B" },
      { id: 3, islandName: "島C" },
    ];
    const setIslandTags = jest.fn();
    const setSelectedValues = jest.fn();
    const setSelectError = jest.fn();

    render(
      <AddNameHandler
        tempSelectedValues={tempSelectedValues}
        selectedValues={selectedValues}
        islands={islands}
        setIslandTags={setIslandTags}
        setSelectedValues={setSelectedValues}
        setSelectError={setSelectError}
      />,
    );

    // ボタンが表示されていることを検証
    const buttonElement = screen.getByRole("button", { name: "追加" });
    expect(buttonElement).toBeInTheDocument();
  });
});
