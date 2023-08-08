import React from "react";
import { render, fireEvent } from "@testing-library/react";
import QuitConf from "../../../../components/modalWindows/quitConf/quitConf";

describe("QuitConf", () => {
  it("コンテンツを表示し、入力の変更を処理すること", () => {
    const close2Modal = jest.fn();
    const nextOpen2 = jest.fn();
    const setInputValue = jest.fn();

    const { getByText, getByAltText } = render(
      <QuitConf
        close2Modal={close2Modal}
        nextOpen2={nextOpen2}
        inputValue=""
        setInputValue={setInputValue}
      />,
    );

    const closeButton = getByAltText("×ボタン");
    const title = getByText("アカウントを本当に削除してもよろしいですか？");
    const deleteButton = getByText("アカウントを削除する");
    const input = document.getElementById("inputText");

    // レンダリングされた要素が適切に表示されているかどうか
    expect(closeButton).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "山田次郎" } });

    // setInputValue関数が正しく呼び出されること
    expect(setInputValue).toHaveBeenCalledWith("山田次郎");
  });
});
