import React from "react";
import { render } from "@testing-library/react";
import HandleNameBlur from "./handleNameBlur";

jest.mock("../../../createClient", () => ({
  supabase: {
    // .mockReturnThis(): メソッドチェーン
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    data: [{ islandName: "Existing Island", status: false }],
    error: null,
  },
}));

describe("HandleNameBlur", () => {
  it("Nameが空の時、エラーが表示されること", () => {
    const setNameError = jest.fn();
    const setNameAlreadyError = jest.fn();

    render(
      <HandleNameBlur
        Name=""
        setNameError={setNameError}
        setNameAlreadyError={setNameAlreadyError}
        type="island"
      />,
    );

    expect(setNameError).toHaveBeenCalledWith("※島名は入力必須項目です");
    expect(setNameAlreadyError).not.toHaveBeenCalled();
  });

  it("Nameに値がないとき、エラーが表示されないこと", () => {
    // モック関数作成（コンポーネント内で使用される関数）
    const setNameError = jest.fn(() => {});
    const setNameAlreadyError = jest.fn();

    // render関数：コンポーネントレンダリング
    render(
      <HandleNameBlur
        Name="Some Name"
        setNameError={setNameError}
        setNameAlreadyError={setNameAlreadyError}
        type="island"
      />,
    );

    // setNameError("※島名は入力必須項目です")が呼ばれていないこと
    expect(setNameError).not.toHaveBeenCalled();
    // setNameAlreadyError("※島名が既に存在します")が呼ばれていないこと
    expect(setNameAlreadyError).not.toHaveBeenCalled();
  });

  // it("displays an error message when Name already exists", async () => {
  //   const setNameError = jest.fn();
  //   const setNameAlreadyError = jest.fn();

  //   render(
  //     <HandleNameBlur
  //       Name="Existing Island"
  //       setNameError={setNameError}
  //       setNameAlreadyError={setNameAlreadyError}
  //       type="island"
  //     />,
  //   );

  //   expect(setNameError).not.toHaveBeenCalled();
  //   expect(setNameAlreadyError).toHaveBeenCalledWith("※島名が既に存在します");
  // });
});
