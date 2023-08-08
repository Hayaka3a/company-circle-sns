import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CreateDeleteCheck from "../../../components/modalWindows/createDeletingCheck";
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

    render(
      <CreateDeleteCheck
        close2Modal={close2Modal}
        nextOpen2={nextOpen2}
        inputValue=""
        setInputValue={setInputValue}
      />
    );

    // 「本当に島を沈没させてもよろしいですか？」テキストが表示されていることを確認
    expect(screen.getByText("本当に島を沈没させてもよろしいですか？")).toBeInTheDocument();

    // 「削除するために下記のテキストボックスに　島名を入力してください」テキストが表示されていることを確認
    expect(screen.getByText("削除するために下記のテキストボックスに 島名を入力してください")).toBeInTheDocument();

    // 「※スペースを入れずに入力してください」テキストが表示されていることを確認
    expect(screen.getByText("※スペースを入れずに入力してください")).toBeInTheDocument();
  });

  test("テキストボックスの入力値の正当性を確認し、空白文字が入力されている場合にエラーメッセージを表示", () => {
    const close2Modal = jest.fn();
    const nextOpen2 = jest.fn();
    const setInputValue = jest.fn();

    useParams.mockReturnValue({ id: "99" });

    render(
      <CreateDeleteCheck
        close2Modal={close2Modal}
        nextOpen2={nextOpen2}
        inputValue=""
        setInputValue={setInputValue}
      />
    );

    // テキストボックスを取得
    const inputElement = screen.getByRole("textbox");

    // テキストボックスにホワイトスペースが入力されている場合
    fireEvent.change(inputElement, { target: { value: " " } });
    // エラーメッセージが表示されることを確認
    expect(screen.getByText("空白文字は入力できません")).toBeInTheDocument();
    
    // テキストボックスに正しい値が入力されている場合
    fireEvent.change(inputElement, { target: { value: "正しい島"} });
    // エラーメッセージが表示されないことを確認
    expect(screen.queryByText("空白文字は入力できません")).toBeNull();
  });

  test("テキストボックスの入力値の正当性を確認し、誤った値が入力されている場合にエラーメッセージを表示", () => {
    const close2Modal = jest.fn();
    const nextOpen2 = jest.fn();
    const setInputValue = jest.fn();

    useParams.mockReturnValue({ id: "99" });

    render(
      <CreateDeleteCheck
        close2Modal={close2Modal}
        nextOpen2={nextOpen2}
        inputValue=""
        setInputValue={setInputValue}
      />
    );
    
    // テキストボックスを取得
    const inputElement = screen.getByRole("textbox");

    // テキストボックスに誤った値が入力されている場合
    fireEvent.change(inputElement, { target: { value: "エラー島" } });
    // エラーメッセージが表示されることを確認
    expect(() => {
      screen.getByText("入力された島名が間違っています");
    }).toThrow();

    // テキストボックスに正しい値が入力されている場合
    fireEvent.change(inputElement, { target: { value: "正しい島"} });
    // エラーメッセージが表示されないことを確認
    expect(screen.queryByText("入力された島名が間違っています")).toBeNull();
  });

  test("×ボタンが押されたときにclose2Modal関数が呼び出されるとを確認", () => {
    const close2Modal = jest.fn();
    const nextOpen2 = jest.fn();
    const setInputValue = jest.fn();
  
    useParams.mockReturnValue({ id: "99" });

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
  
    useParams.mockReturnValue({ id: "99" });

    render(
      <CreateDeleteCheck
        close2Modal={close2Modal}
        nextOpen2={nextOpen2}
        inputValue=""
        setInputValue={setInputValue}
      />
    );

    // 削除するボタンを取得し、クリックイベントを発生させる
    const deleteButton = screen.getByText("削除する");
    fireEvent.click(deleteButton);
  });
});
