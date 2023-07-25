import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // MemoryRouterを追加
import MenubarIsland from "../../../../components/menubar/menubarIsland/menubarIsland";

// PartUseEffectIslandコンポーネントをモックする
jest.mock(
  "../../../../components/menubar/menubarIsland/partUseEffectIsland",
  () => ({
    __esModule: true,
    default: jest.fn(() => <div />), // PartUseEffectIslandをダミーコンポーネントで置き換える
  }),
);

describe("MenubarIslandコンポーネント", () => {
  it("islandに値がある場合、islandNameが表示されること", () => {
    const island = {
      islandName: "テスト島",
      thumbnail: "https://example.com/thumbnail.png",
    };

    // MemoryRouterでコンポーネントをラップする
    const { getByText } = render(
      <MemoryRouter>
        <MenubarIsland />
      </MemoryRouter>,
    );
    const islandNameElement = getByText(`${island.islandName}島`);

    // islandNameが正しく表示されることを確認する
    expect(islandNameElement).toBeInTheDocument();
  });
});
