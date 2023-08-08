import React from "react";
import { render, screen } from "@testing-library/react";
import DeleteNameHandler from "../../../components/islandSelected/deleteNameHandler";

describe("DeleteNameHandlerコンポーネント", () => {
  test("ボタンが表示されていること", () => {
    const selectedValues = ["島A", "島B"];
    const islands = [
      { id: 1, islandName: "島A" },
      { id: 2, islandName: "島B" },
      { id: 3, islandName: "島C" },
    ];
    const setSelectedValues = jest.fn();
    const setIslandTags = jest.fn();
    const index = 1;

    render(
      <DeleteNameHandler
        selectedValues={selectedValues}
        islands={islands}
        setSelectedValues={setSelectedValues}
        setIslandTags={setIslandTags}
        index={index}
      />,
    );

    // ボタンが表示されていることを検証
    const buttonElement = screen.getByRole("button", { name: "×" });
    expect(buttonElement).toBeInTheDocument();
  });
});
