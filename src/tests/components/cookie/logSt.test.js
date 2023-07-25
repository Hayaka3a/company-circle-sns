import React from "react";
import { render, act } from "@testing-library/react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LogSt from "../../../components/cookie/logSt";
import CheckLoginStatus from "../../../components/cookie/checkLoginStatus";

jest.mock("react-cookie");
jest.mock("react-router-dom");
jest.mock("../../../components/cookie/checkLoginStatus"); // パスを正しく指定する

describe("LogSt", () => {
  // 各テストケースの前に実行される設定
  beforeEach(() => {
    // 例えば、useCookiesモックは[{ loginSt: false }]を返す
    useCookies.mockReturnValue([{ loginSt: false }]);
    useNavigate.mockReturnValue(jest.fn());
    CheckLoginStatus.mockReturnValue(null);
  });

  //  各テストケースの後にモック関数の呼び出しをクリアにする
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("loginStatusとnavigateを使用してCheckLoginStatusが呼び出されること", () => {
    render(<LogSt />);

    // CheckLoginStatusがloginSt:falseとexpect.any(Function)という引数と共に呼び出される
    // expect.any(Function): jestのマッチャーの1つ
    // expect.any(Function)が使用されると、実際の値が関数であるかどうかを確認。関数であれば、テストはパス
    expect(CheckLoginStatus).toHaveBeenCalledWith(
      { loginSt: false },
      expect.any(Function),
    );
  });
});
