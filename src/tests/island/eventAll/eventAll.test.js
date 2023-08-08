import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import EventAll from "../../../island/eventAll/eventAll";
import FetchEventDataIsland from "../../../island/eventAll/fetchEventData";

jest.mock("../../../island/eventAll/fetchIslandName", () => ({
  __esModule: true,
  default: jest.fn((islandName, setIslandName, paramsID) => {
    setIslandName("テスト");
  }),
}));

jest.mock("../../../island/eventAll/fetchEventData", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(({ paramsID, setEvents, events }) => {
    // デフォルトのモック実装
    setEvents([]); // デフォルトでは空のメッセージリストをモック
  }),
}));

describe("EventAllコンポーネント", () => {
  test("「島　開催イベント」が表示されること", async () => {
    render(
      <MemoryRouter>
        <EventAll />
      </MemoryRouter>,
    );

    await act(async () => {});

    const islandName = screen.getByText("島 開催イベント");
    expect(islandName).toBeInTheDocument();
  });

  test("「新しいイベントを始める」ボタンが表示されること", async () => {
    render(
      <MemoryRouter>
        <EventAll />
      </MemoryRouter>,
    );
    const islandName = screen.getByText("新しいイベントを始める");
    expect(islandName).toBeInTheDocument();
  });

  test("開催イベントはありませんの表示がされるかどうか", async () => {
    render(
      <MemoryRouter>
        <EventAll />
      </MemoryRouter>,
    );

    const noEventsMessage = screen.getByText("開催イベントはありません");
    expect(noEventsMessage).toBeInTheDocument();
  });

  test("eventsに値がある場合、受信メッセージが表示されること", async () => {
    FetchEventDataIsland.mockImplementationOnce(
      ({ paramsID, setEvents, events }) => {
        const mockEvents = [
          {
            id: 1,
            eventName: "テストイベント1",
            startDate: "2023-08-10T00:00:00.000Z",
            endDate: "2023-08-15T00:00:00.000Z",
            thumbnail: "/path/to/thumbnail1.jpg",
          },
          {
            id: 2,
            eventName: "テストイベント2",
            startDate: "2023-08-20T00:00:00.000Z",
            endDate: "2023-08-25T00:00:00.000Z",
            thumbnail: "/path/to/thumbnail2.jpg",
          },
        ];
        setEvents(mockEvents);
      },
    );

    render(
      <MemoryRouter>
        <EventAll />
      </MemoryRouter>,
    );

    await waitFor(() => {
      // イベント名が表示されていることを確認
      const messageElementA = screen.queryByText("テストイベント1");
      expect(messageElementA).toBeInTheDocument();

      const messageElementB = screen.queryByText("テストイベント2");
      expect(messageElementB).toBeInTheDocument();

      // 「開催期間」が表示されていることを確認
      const period = screen.queryAllByText(/開催期間/);
      expect(period.length).toBe(2);

      // 各開催期間のテキストを含む親要素を検索してテキストの存在を確認
      const startDateElementsA = screen.queryAllByText("2023年8月10日");
      startDateElementsA.forEach((startDateElement) => {
        const parentElement = startDateElement.closest(".eventInfo"); // 開催期間を含む親要素を特定
        expect(parentElement).toBeInTheDocument(); // 親要素が存在することを確認
      });

      const endDateElementsA = screen.queryAllByText("2023年8月15日");
      endDateElementsA.forEach((startDateElement) => {
        const parentElement = startDateElement.closest(".eventInfo"); // 開催期間を含む親要素を特定
        expect(parentElement).toBeInTheDocument(); // 親要素が存在することを確認
      });

      const startDateElementsB = screen.queryAllByText("2023年8月20日");
      startDateElementsB.forEach((startDateElement) => {
        const parentElement = startDateElement.closest(".eventInfo"); // 開催期間を含む親要素を特定
        expect(parentElement).toBeInTheDocument(); // 親要素が存在することを確認
      });

      const endDateElementsB = screen.queryAllByText("2023年8月25日");
      endDateElementsB.forEach((startDateElement) => {
        const parentElement = startDateElement.closest(".eventInfo"); // 開催期間を含む親要素を特定
        expect(parentElement).toBeInTheDocument(); // 親要素が存在することを確認
      });
    });
  });
});
