import { render, screen } from "@testing-library/react";
import SearchDisplay from "../../../components/search/SearchDisplay";
import { BrowserRouter } from "react-router-dom";

// search/SearchResultFetchモジュールをモックする
jest.mock("../../../components/search/SearchResultFetch", () => ({
  islandFetch: jest.fn(),
  eventFetch: jest.fn(),
  filterData: jest.fn(),
}));

describe("SearchDisplay", () => {
  test("検索結果が表示されること", async () => {
    const word = "テスト";
    const radio = "all";
    const completion = [
      {
        id: 1,
        thumbnail: "https://example.com/image.jpg",
        table: "島",
        tableQuery: "island",
        name: "テスト島",
        detail: "テスト島の詳細情報",
      },
      {
        id: 2,
        thumbnail: "https://example.com/image2.jpg",
        table: "イベント",
        tableQuery: "event",
        name: "テストイベント",
        detail: "テストイベントの詳細情報",
      },
    ];

    // SearchResultFetchモジュールの関数をモックする
    require("../../../components/search/SearchResultFetch").islandFetch.mockResolvedValue(
      [],
    );
    require("../../../components/search/SearchResultFetch").eventFetch.mockResolvedValue(
      [],
    );
    require("../../../components/search/SearchResultFetch").filterData.mockImplementation(
      ({ setCom }) => {
        setCom(completion);
      },
    );

    render(
      <BrowserRouter>
        <SearchDisplay word={word} radio={radio} />
      </BrowserRouter>,
    );

    // 検索結果が表示されることを確認する
    const islandName = screen.getByText("テスト島");
    const eventName = screen.getByText("テストイベント");
    expect(islandName).toBeInTheDocument();
    expect(eventName).toBeInTheDocument();
  });

  test("検索結果が0件の場合、適切なメッセージが表示されること", async () => {
    const word = "存在しないテスト";
    const radio = "all";
    const completion = [];

    // SearchResultFetchモジュールの関数をモックする
    require("../../../components/search/SearchResultFetch").islandFetch.mockResolvedValue(
      [],
    );
    require("../../../components/search/SearchResultFetch").eventFetch.mockResolvedValue(
      [],
    );
    require("../../../components/search/SearchResultFetch").filterData.mockImplementation(
      ({ setCom }) => {
        setCom(completion);
      },
    );

    render(<SearchDisplay word={word} radio={radio} />);

    // "検索結果は0件です"というメッセージが表示されることを確認する
    const message = screen.getByText("検索結果は0件です");
    expect(message).toBeInTheDocument();
  });
});
