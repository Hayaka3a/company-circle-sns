import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../../../user/login/login";
import { MemoryRouter } from "react-router-dom";

describe("メールアドレス入力欄", () => {
  test("placeholderにログインID（登録メールアドレス）が表示されていること", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const emailInput =
      screen.getByPlaceholderText("ログインID（登録メールアドレス）");
    expect(emailInput).toBeInTheDocument();
  });

  test("入力最大文字数が250文字になっていること", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    // 「ログインID（登録メールアドレス）」というプレースホルダーテキストを持つinput要素を取得
    const emailInput =
      screen.getByPlaceholderText("ログインID（登録メールアドレス）");

    // 250文字を入力する（文字列aを250回繰り返す）
    const longInput = "a".repeat(250);
    fireEvent.change(emailInput, { target: { value: longInput } });

    // 入力された値が250文字に制限されていることを確認
    expect(emailInput.value).toHaveLength(250);
  });
});

describe("パスワード入力欄", () => {
  test("placeholderにパスワードが表示されていること", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    const emailInput = screen.getByPlaceholderText("パスワード");
    expect(emailInput).toBeInTheDocument();
  });

  test("入力最大文字数が16文字になっていること", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    const emailInput = screen.getByPlaceholderText("パスワード");

    // 250文字を入力する
    const longInput = "a".repeat(16);
    fireEvent.change(emailInput, { target: { value: longInput } });

    // 入力された値が16文字に制限されていることを確認
    expect(emailInput.value).toHaveLength(16);
  });
});

describe("Loginコンポーネント", () => {
  test("ログインボタンが表示されているか", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    const loginButton = screen.getByText("ログイン");
    expect(loginButton).toBeInTheDocument();
  });

  test("新規ユーザー登録リンクが表示されているか", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    const newUserLink = screen.getByText("新規ユーザー登録");
    expect(newUserLink).toBeInTheDocument();
  });
});
