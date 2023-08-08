import React from "react";
import { render, screen } from "@testing-library/react";
import CreateSendingMessage from "../../../components/modalWindows/createSendingMessage";

// useStateをモックするためのモック関数を作成
jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
  }));
  
// EventSendingMessageコンポーネントのsetEventNameを仮想的に設定するためのモック関数
const mockSetIslandName = jest.fn();
  
describe("CreateSendingMessage", () => {
  test("islandNameが存在する場合に、メッセージが表示される", () => {
    // useStateのモックを設定し、setIslandNameが"テストアイランド"を返すようにする
    React.useState.mockReturnValue(["テストアイランド", mockSetIslandName]);

    // モック関数を使用してCreateSendingMessageコンポーネントをレンダリング
    render(
      <CreateSendingMessage closeModal={() => {}} table="testTable" />
    );

    // 島名が表示されていることを確認
    const islandNameElement = screen.getByText(/テストアイランド島/); // 正規表現を使用してテキストを検索
    expect(islandNameElement).toBeInTheDocument();

    // 「メッセージを送る」のテキストが表示されていることを確認
    const messageNameElement = screen.getByText("メッセージを送る");
    expect(messageNameElement).toBeInTheDocument();

    // 「送信する」ボタンが表示されていることを確認
    const sendButton = screen.getByRole("button", { name: "送信する" });
    expect(sendButton).toBeInTheDocument();
  });
});
