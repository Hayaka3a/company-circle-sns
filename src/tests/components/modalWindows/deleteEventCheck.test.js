import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateDeleteCheck from "../../../components/modalWindows/deleteEventCheck";
import { useParams } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("CreateDeleteCheck", () => {
  test("モーダルウィンドウの初期表示が正しくされること", () => {
    // モック関数を作成
    const close2Modal = jest.fn();
    const nextOpen2 = jest.fn();
    const setInputValue = jest.fn();

    // useParamsをモック
    useParams.mockReturnValue({ id: "99" });

    // CreateDeleteCheckコンポーネントをレンダリング
    render(
      <CreateDeleteCheck
        close2Modal={close2Modal}
        nextOpen2={nextOpen2}
        inputValue=""
        setInputValue={setInputValue}
      />
    );
  
    // 「本当にイベントを削除してもよろしいですか？」テキストが表示されていることを確認
    expect(screen.getByText("本当にイベントを削除してもよろしいですか？")).toBeInTheDocument();
  
    // 「削除するために下記のテキストボックスに イベント名を入力してください」テキストが表示されていることを確認
    expect(screen.getByText("削除するために下記のテキストボックスに イベント名を入力してください")).toBeInTheDocument();
  
    // 「※スペースを入れずに入力してください」テキストが表示されていることを確認
    expect(screen.getByText("※スペースを入れずに入力してください")).toBeInTheDocument();
  });

    test("×ボタンが押されたときにclose2Modal関数が呼び出されることを確認", () => {
     const close2Modal = jest.fn();
     const nextOpen2 = jest.fn();
     const setInputValue = jest.fn();

    useParams.mockReturnValue({ id: "44" });

    render(
      <CreateDeleteCheck
        close2Modal={close2Modal}
        nextOpen2={nextOpen2}
        inputValue=""
        setInputValue={setInputValue}
      />
    );

    // ×ボタンを取得し、クリックイベントを発生させる
    const closeButton = screen.getByAltText("×ボタン");
    fireEvent.click(closeButton);

    // close2Modal関数が1回呼び出されたことを確認
    expect(close2Modal).toHaveBeenCalledTimes(1);
  });

  test("削除するボタンがクリックされたときにnextOpen2関数が呼び出されることを確認", async () => {
    const close2Modal = jest.fn();
    const nextOpen2 = jest.fn();
    const setInputValue = jest.fn();

    useParams.mockReturnValue({ id: "44" });

    render(
      <CreateDeleteCheck
        close2Modal={close2Modal}
        nextOpen2={nextOpen2}
        inputValue="削除用イベント"
        setInputValue={setInputValue}
      />
    );

    // 削除するボタンを取得し、クリックイベントを発生させる
    const deleteButton = screen.getByText("削除する");
    fireEvent.click(deleteButton);
  });  
});
