import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import IslandPost from "../../island/post";

jest.mock("../../components/cookie/logSt");
jest.mock("../../components/menubarIsland", () => () => {});

describe("IslandPost", () => {
  //表示させるダミーメッセージの設定
  const messages = [
    {
      id: 1,
      by: {
        users: {
          icon: "dummy_icon_url",
          familyName: "テスト",
          firstName: "ユーザー",
        },
      },
      isRead: false,
      sendingDate: "2023-07-20T12:00:00.000Z",
      message: "テストメッセージ1",
    },
    {
      id: 2,
      by: {
        users: {
          icon: "dummy_icon_url",
          familyName: "サンプル",
          firstName: "ユーザー",
        },
      },
      isRead: true,
      sendingDate: "2023-07-19T09:00:00.000Z",
      message: "テストメッセージ2",
    },
  ];

  test("メッセージがない場合の表示確認", async () => {
    // fetchMsgのモック関数を設定(messages[]が空になるように)
    const mockFetchMsg = jest.fn();
    mockFetchMsg.mockResolvedValue([]);
    require("../../components/post/fetchMsg").fetchMsg = mockFetchMsg;

    // readHandlerのモック関数を設定
    const mockReadHandler = jest.fn();
    require("../../components/post/readHandler").readHandler = mockReadHandler;

    render(
      <BrowserRouter>
        <IslandPost />
      </BrowserRouter>,
    );

    expect(screen.getByText("受信メッセージ✉️")).toBeInTheDocument();

    const noMessageText = await screen.findByText("受信メッセージはありません");
    expect(noMessageText).toBeInTheDocument();

    // 「表示」ボタンが表示されていないことを確認 (メッセージがないので表示ボタンもない)
    const displayButton = screen.queryByText("表示");
    expect(displayButton).not.toBeInTheDocument();

    // 「住民許可待ち申請」ボタンが表示されていることを確認
    const entryPermitButton = screen.getByText("住民許可待ち申請");
    expect(entryPermitButton).toBeInTheDocument();

    // 「島に招待する」ボタンが表示されていることを確認
    const inviteButton = screen.getByText("島に招待する");
    expect(inviteButton).toBeInTheDocument();
  });

  test("fetchMsgがメッセージを返してきたとき、メッセージが正しく表示される", async () => {
    // fetchMsgのモック関数を設定(中身のあるmessages[]を返す)
    const mockFetchMsg = jest.fn();
    mockFetchMsg.mockResolvedValue(messages);
    require("../../components/post/fetchMsg").fetchMsg = mockFetchMsg;

    // readHandlerのモック関数を設定
    const mockReadHandler = jest.fn();
    require("../../components/post/readHandler").readHandler = mockReadHandler;

    render(
      <BrowserRouter>
        <IslandPost />
      </BrowserRouter>,
    );

    //messages[]が表示されているか確認
    await waitFor(() => {
      const username1 = screen.findByText(/テストユーザー/);
      expect(username1).toBeInTheDocument();
      const unreadLabel = screen.getByText("未読");
      expect(unreadLabel).toBeInTheDocument();
      const message1 = screen.getByText("テストメッセージ1...");
      expect(message1).toBeInTheDocument();

      const username2 = screen.findByText(/サンプルユーザー/);
      expect(username2).toBeInTheDocument();
      const readLabel = screen.getByText("既読");
      expect(readLabel).toBeInTheDocument();
      const message2 = screen.getByText("テストメッセージ2...");
      expect(message2).toBeInTheDocument();
    });
  });
});
