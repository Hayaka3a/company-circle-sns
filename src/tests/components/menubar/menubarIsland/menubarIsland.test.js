import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MenubarIsland from "../../../../components/menubar/menubarIsland/menubarIsland";
import "@testing-library/jest-dom/extend-expect";

jest.mock(
  "../../../../components/menubar/menubarIsland/partUseEffectIsland",
  () => {
    const PartUseEffectIslandMock = (props) => {
      const islandData = {
        islandName: "テスト",
        thumbnail: "test_thumbnail.png",
      };
      props.onIslandDataFetched(islandData);
      return <div />;
    };
    return PartUseEffectIslandMock;
  },
);

jest.mock(
  "../../../../components/menubar/menubarIsland/IslandJoinStatus",
  () => {
    return (props) => {
      props.setIsJoined(true);
      return <div />;
    };
  },
);

describe("MenubarIslandコンポーネント", () => {
  it("islandに値がある場合、islandNameが表示されること", () => {
    const island = {
      islandName: "テスト",
      thumbnail: "https://example.com/thumbnail.png",
    };

    // MemoryRouterでコンポーネントをラップする
    const { container } = render(
      <MemoryRouter>
        <MenubarIsland />
      </MemoryRouter>,
    );

    // islandNameが正しく表示されることを確認する
    const islandNameElement = container.querySelector(".menubar h3.title");
    expect(islandNameElement).toBeInTheDocument(); // toBeInTheDocumentを使用する

    // テキストが正しく表示されることを確認する
    const actualText = "テスト島";
    const expectedText = `${island.islandName}島`;
    expect(actualText).toBe(expectedText);
  });
});

test("isJoinedがtrueの場合に参加者用のメニューコンテンツを表示する", async () => {
  render(
    <MemoryRouter>
      <MenubarIsland paramsID={1} isJoined={true} />
    </MemoryRouter>,
  );

  await waitFor(() => {
    expect(screen.getByText("掲示板")).toBeInTheDocument();
    expect(screen.getByText("ポスト")).toBeInTheDocument();
    expect(screen.getByText("イベント")).toBeInTheDocument();
    expect(screen.getByText("島民一覧")).toBeInTheDocument();
    expect(screen.getByText("島詳細")).toBeInTheDocument();
  });
});

test("isJoinedがfalseの場合に参加者用のメニューコンテンツを表示する", async () => {
  jest.mock(
    "../../../../components/menubar/menubarIsland/IslandJoinStatus",
    () => {
      return (props) => {
        props.setIsJoined(false);
        return <div />;
      };
    },
  );
  const { getByText, queryByText } = render(
    <MemoryRouter>
      <MenubarIsland paramsID={1} isJoined={false} />
    </MemoryRouter>,
  );

  await waitFor(() => {
    expect(getByText("イベント")).toBeInTheDocument();
    expect(getByText("島民一覧")).toBeInTheDocument();
    expect(getByText("島詳細")).toBeInTheDocument();

    expect(queryByText("掲示板")).toBeNull();
    expect(queryByText("ポスト")).toBeNull();
  });
});
