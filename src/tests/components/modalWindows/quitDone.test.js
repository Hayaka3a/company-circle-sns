import { render, fireEvent, screen } from "@testing-library/react";
import QuitDone from "../../../components/modalWindows/quitDone";

describe("quitDone", () => {
  test("quitDoneを実行", () => {
    const doneMock = jest.fn();
    render(<QuitDone done={doneMock} />);

    // アカウント削除完了テキスト表示確認
    const text = screen.getByText("アカウント削除が完了しました");
    expect(text).toBeInTheDocument();

    // ユーザーがOKボタンをクリックしたら、done関数を呼ぶ
    const button = screen.getByText("OK");
    fireEvent.click(button);

    expect(doneMock).toHaveBeenCalled();
  });
});
