import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UserRegistration from "../components/UserRegistration";

test("UserRegistrationのレンダリングテスト", () => {
  render(
    <Router>
      <UserRegistration />
    </Router>,
  );

  // テキストボックス要素を取得
  const textElement = screen.getAllByRole("textbox");
  //テキストボックスの数を確認
  expect(textElement).toHaveLength(8);

  // 氏名の入力欄が存在することを確認
  const firstNameInput = screen.getByText(/氏名/);
  expect(firstNameInput).toBeInTheDocument();

  // カナの入力欄が存在することを確認
  const familyNameKanaInput = screen.getByText(/カナ/);
  expect(familyNameKanaInput).toBeInTheDocument();

  // メールアドレスの入力欄が存在することを確認
  const mailAddressInput = screen.getByText(/メールアドレス/);
  expect(mailAddressInput).toBeInTheDocument();

  // パスワードの入力欄が存在することを確認
  const passwordInput = screen.getAllByText(/パスワード/);
  expect(passwordInput).toHaveLength(2);

  const confirmPasswordInput = screen.getByText(/確認パスワード/);
  expect(confirmPasswordInput).toBeInTheDocument();

  // アイコンの入力欄が存在することを確認
  const iconInput = screen.getByText(/アイコン/);
  expect(iconInput).toBeInTheDocument();

  // 社員番号の入力欄が存在することを確認
  const employeeCodeInput = screen.getByText(/社員番号/);
  expect(employeeCodeInput).toBeInTheDocument();

  // 職種の選択肢が存在することを確認
  const departmentOptions = screen.getAllByRole("radio");
  expect(departmentOptions).toHaveLength(8);

  // 登録ボタンが存在することを確認
  const submitButton = screen.getByRole("button", { name: /登録/ });
  expect(submitButton).toBeInTheDocument();
});
