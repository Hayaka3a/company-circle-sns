import { render, fireEvent, screen } from "@testing-library/react";
import QuitUser from "../../../components/modalWindows/quitUser";

describe("quitUser", () => {
  test("quitUserを実行", () => {
    const closeMock = jest.fn();
    const openMock = jest.fn();
    render(<QuitUser closeModal={closeMock} nextOpen={openMock} />);

    // アカウントを削除しますか？テキストを表示
    const test = screen.getByText("アカウントを削除しますか？");
    expect(test).toBeInTheDocument();

    //✖ボタンをクリックしたら、closeModal関数を呼ぶ
    const closeBtn = screen.getByAltText("×ボタン");
    fireEvent.click(closeBtn);

    expect(closeMock).toHaveBeenCalled();

    // ユーザーがアカウントを削除するボタンをクリックしたら、openModal関数を呼ぶ
    const button = screen.getByText("アカウントを削除する");
    fireEvent.click(button);

    expect(openMock).toHaveBeenCalled();
  });
});
