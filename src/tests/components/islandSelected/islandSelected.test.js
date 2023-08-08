import React from "react";
import { render, screen } from "@testing-library/react";
import SelectIsland from "../../../components/islandSelected/islandSelected";

describe("SelectIslandコンポーネント", () => {
  test("「サークルを選択してください」というテキストが表示されていること", () => {
    const islandIDs = ["1", "2", "3"];
    const setIslandTags = jest.fn();

    render(
      <SelectIsland islandIDs={islandIDs} setIslandTags={setIslandTags} />,
    );

    // テキストが表示されていることを検証
    const textElement = screen.getByText("サークルを選択してください");
    expect(textElement).toBeInTheDocument();
  });
});
