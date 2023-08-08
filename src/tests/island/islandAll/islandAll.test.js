import React from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import IslandAll from "../../../island/islandAll/islandAll";
import FetchIslandsData from "../../../island/islandAll/fetchIslnadsData";

jest.mock("../../../island/islandAll/fetchIslnadsData", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((islands, setIslands) => {
    // デフォルトのモック実装
    setIslands([]); // デフォルトでは空のメッセージリストをモック
  }),
}));

describe("IslandAllコンポーネント", () => {
  test("島一覧の文字が表示されているかどうか", async () => {
    FetchIslandsData.mockImplementationOnce((islands, setIslands) => {
      const mockIslands = [
        {
          id: 1,
          islandName: "テスト島1",
          detail: "テスト島1の詳細情報",
          thumbnail: "/path/to/thumbnail1.jpg",
        },
        {
          id: 2,
          islandName: "テスト島2",
          detail: "テスト島2の詳細情報",
          thumbnail: "/path/to/thumbnail2.jpg",
        },
      ];
      setIslands(mockIslands);
    });

    render(
      <MemoryRouter>
        <IslandAll />
      </MemoryRouter>,
    );

    const titleElement = screen.getByText("島一覧");
    expect(titleElement).toBeInTheDocument();

    const islandNameElementA = screen.getByText("テスト島1");
    expect(islandNameElementA).toBeInTheDocument();

    const islandNameElementB = screen.getByText("テスト島2");
    expect(islandNameElementB).toBeInTheDocument();
  });
});
