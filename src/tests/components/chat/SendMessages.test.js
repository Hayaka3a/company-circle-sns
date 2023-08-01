import { render, fireEvent } from "@testing-library/react";
import SendMessages from "../../../components/chat/SendMessages";

describe("Chatコンポーネントのテスト", () => {
  test("チャット送信部分の表示確認", async () => {
    const { getByTestId } = render(<SendMessages threadID={1} />);
    // メッセージを送信するinputがあることを確認
    const inputElement = getByTestId("message");
    expect(inputElement).toBeInTheDocument;

    //送信ボタンがあることを確認
    const buttonElement = getByTestId("sendButton");
    expect(buttonElement).toBeInTheDocument;
  });

  test("メッセージの有無でボタンの状態が変わること", () => {
    const { getByTestId } = render(<SendMessages threadID={1} />);

    // ボタンがクリック不可であることを確認
    expect(getByTestId("sendButton")).toBeDisabled();

    // テキスト入力に何かしらの入力を行い、ボタンがクリック可能になることを確認
    const inputElement = getByTestId("message");
    fireEvent.change(inputElement, { target: { value: "テストメッセージ" } });
    expect(getByTestId("sendButton")).toBeEnabled();

    // テキストをクリアして、再度ボタンがクリック不可になったことを確認
    fireEvent.change(inputElement, { target: { value: "" } });
    expect(getByTestId("sendButton")).toBeDisabled();
  });
});
