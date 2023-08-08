import React from "react";
import { render, screen } from "@testing-library/react";
import CreateResidentApplication from "../../../components/modalWindows/createResidentApplication";

// useStateをモックするためのモック関数を作成
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

// EventSendingMessageコンポーネントのsetEventNameを仮想的に設定するためのモック関数
const mockSetIslandName = jest.fn();

describe("CreateResidentApplication", () => {
  test("islandNameが存在する場合に、メッセージが表示される", () => {
    // useStateのモックを設定し、setIslandNameが"テストアイランド"を返すようにする
    React.useState.mockReturnValue(["テストアイランド", mockSetIslandName]);

    // モック関数を使用してCreateSendingMessageコンポーネントをレンダリング
    render(
      <CreateResidentApplication closeModal={() => {}} table="testTable" />
    );

    // 島名が表示されていることを確認
    const islandNameElement = screen.getByRole("heading", { name: "テストアイランド" }); 
    expect(islandNameElement).toBeInTheDocument();

    // 「送信する」ボタンが表示されていることを確認
    const sendButton = screen.getByRole("button", { name: "送信する" });
    expect(sendButton).toBeInTheDocument();
  });
});
