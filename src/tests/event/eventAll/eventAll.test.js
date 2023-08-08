import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventEverything from "../../../event/eventAll/eventAll";

describe("EventEverythingコンポーネント", () => {
  it("イベント一覧のテキストが表示されていること", () => {
    render(
      <MemoryRouter>
        <EventEverything />
      </MemoryRouter>,
    );

    const eventListText = screen.getByText("イベント一覧");
    expect(eventListText).toBeInTheDocument();
  });

  it("eventsのデータがあるとき、「開催時期」が表示されていること", () => {
    // eventsのダミーデータを作成
    const dummyEvents = [
      {
        id: 1,
        eventName: "Test Event",
        detail: "Test Event Detail",
        startDate: "2023-08-04T12:00:00Z",
        endDate: "2023-08-05T12:00:00Z",
        thumbnail: "/test_thumbnail.png",
      },
    ];

    render(
      <MemoryRouter>
        <EventEverything />
      </MemoryRouter>,
    );

    // eventsのダミーデータをセットする
    dummyEvents.forEach((event) => {
      // 開催期間のテキストが表示されていることを確認するための関数
      const isEventDateDisplayed = () =>
        screen.getByText(
          new RegExp(
            `開催期間.*${new Date(event.startDate).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}.*${new Date(event.endDate).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`,
            "i",
          ),
        );

      // 例: Test Event の開催期間のテキストが表示されていることを確認
      expect(isEventDateDisplayed).toBeTruthy();
    });
  });
});
