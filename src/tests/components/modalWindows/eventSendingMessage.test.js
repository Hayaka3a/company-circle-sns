import { render, screen } from "@testing-library/react";
import EventSendingMessage from "../../../components/modalWindows/eventSendingMessage";
import React, { useState } from "react";

// useStateをモックするためのモック関数を作成
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

// EventSendingMessageコンポーネントのsetEventNameを仮想的に設定するためのモック関数
const mockSetEventName = jest.fn();

// モック関数を使用してEventSendingMessageコンポーネントをレンダリングするテスト
describe("EventSendingMessage", () => {
  test("eventNameが存在する場合に、メッセージが表示される", () => {
    // useStateのモックを設定し、setEventNameが"テストイベント"を返すようにする
    useState.mockReturnValue(["テストイベント", mockSetEventName]);

    // モック関数を使用してEventSendingMessageコンポーネントをレンダリング
    render(
      <EventSendingMessage closeModal={() => {}} table="testTable" />
    );

    // イベント名が表示されていることを確認
    const eventNameElement = screen.getByRole("heading", {
      name: "テストイベント",
    });
    expect(eventNameElement).toBeInTheDocument();

    // 「メッセージ」のテキストが表示されていることを確認
    const messageNameElement = screen.getByText("メッセージ");
    expect(messageNameElement).toBeInTheDocument();

    // 「送信する」ボタンが表示されていることを確認
    const sendButton = screen.getByRole("button", { name: "送信する" });
    expect(sendButton).toBeInTheDocument();
  });
});
