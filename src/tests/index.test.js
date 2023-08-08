import { render, screen, waitFor } from "@testing-library/react";
import Index from "../index";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

describe("Index", () => {
  beforeEach(() => {
    // モック関数を設定
    jest.mock("../components/index/fetchIslands", () => {
      return jest.fn(() => [
        { id: 1, islandName: "Aの島", thumbnail: "thumbnail1.jpg" },
        { id: 2, islandName: "Bの島", thumbnail: "thumbnail2.jpg" },
        { id: 3, islandName: "Cの島", thumbnail: "thumbnail3.jpg" },
        { id: 4, islandName: "Dの島", thumbnail: "thumbnail4.jpg" },
      ]);
    });
    jest.mock("../components/index/fetchEvents", () => {
      return jest.fn(() => [
        { id: 1, eventName: "A祭り", thumbnail: "eventThumbnail1.jpg" },
        { id: 2, eventName: "B祭り", thumbnail: "eventThumbnail2.jpg" },
        { id: 3, eventName: "C祭り", thumbnail: "eventThumbnail3.jpg" },
        { id: 4, eventName: "D祭り", thumbnail: "eventThumbnail4.jpg" },
      ]);
    });
    jest.mock("../components/cookie/logSt", () => {
      return jest.fn();
    });
    jest.mock("../components/post/belongIsland/belongIsland", () => {
      return jest.fn();
    });
    jest.mock("../components/post/belongEvent/belongEvent", () => {
      return jest.fn();
    });
    jest.mock("../components/post/personalPost/personalPost", () => {
      return jest.fn();
    });
  });

  test("おすすめ島の表示", () => {
    render(
      <BrowserRouter initialEntries={["/"]}>
        <Index />
      </BrowserRouter>,
    );

    //表示された島の数を確認する
    const islandLinks = screen.queryAllByText((content, element) =>
      element.textContent.includes("の島"),
    );
    expect(islandLinks).toHaveLength(4);
  });

  test("新着イベントの表示", async () => {
    render(
      <BrowserRouter initialEntries={["/"]}>
        <Index />
      </BrowserRouter>,
    );

    //新着イベントボタンを取得してクリックする
    const newEventsButton = screen.getByRole("button", {
      name: "新着イベント",
    });
    userEvent.click(newEventsButton);

    //表示されたイベントの数を確認する
    await waitFor(() => {
      const eventLinks = screen.getAllByText(/祭り/);
      expect(eventLinks).toHaveLength(4);
    }, 15000);
  });
});
