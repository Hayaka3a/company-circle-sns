import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserPost from "../../../user/post/post";
import FetchMsg from "../../../user/post/fetchMsg"; // 実際のFetchMsg関数をインポート

// FetchMsg関数をモックする
jest.mock("../../../user/post/fetchMsg", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((userID, setMessages) => {
    // デフォルトのモック実装
    setMessages([]); // デフォルトでは空のメッセージリストをモック
  }),
}));

describe("UserPostコンポーネント", () => {
  test("エラーなく描画されること", () => {
    render(
      <MemoryRouter>
        <UserPost />
      </MemoryRouter>,
    );
    const postHeading = screen.getByText("POST");
    const messageHeading = screen.getByText("受信メッセージ✉️");
    expect(postHeading).toBeInTheDocument();
    expect(messageHeading).toBeInTheDocument();
  });

  test("messagesに値がある場合、受信メッセージが表示されること", async () => {
    FetchMsg.mockImplementationOnce((userID, setMessages) => {
      const testMessages = [
        {
          id: 1,
          by: {
            events: {
              eventName: "テストイベント",
              thumbnail: "event-thumbnail.jpg",
            },
          },
          sendingDate: "2023-08-03T12:34:56.789Z",
          message: "テストイベントだよ",
          isRead: false,
        },
      ];
      setMessages(testMessages);
    });

    render(
      <MemoryRouter>
        <UserPost />
      </MemoryRouter>,
    );

    await waitFor(() => {
      // 「未読」が表示されていることを確認
      const unreadElement = screen.getByText("未読");
      expect(unreadElement).toBeInTheDocument();

      // イベント名が表示されていることを確認
      const messageElement = screen.queryByText("テストイベント");
      expect(messageElement).toBeInTheDocument();

      // 「2023年08月03日」が表示されていることを確認
      const dateElement = screen.getByText("2023年08月03日");
      expect(dateElement).toBeInTheDocument();

      // 「表示」ボタンが表示されていることを確認 (メッセージがないので表示ボタンもない)
      const displayButton = screen.queryByText("表示");
      expect(displayButton).toBeInTheDocument();
    });
  });

  test("messagesに値がない場合、「受信メッセージはありません」が表示されること", async () => {
    FetchMsg.mockImplementationOnce((userID, setMessages) => {
      setMessages([]); // 空のメッセージリストを設定
    });

    render(
      <MemoryRouter>
        <UserPost />
      </MemoryRouter>,
    );

    await waitFor(() => {
      const noMessageElement = screen.getByText("受信メッセージはありません");
      expect(noMessageElement).toBeInTheDocument();
    });
  });
});
