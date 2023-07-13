import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";

test("HeaderのHTML確認", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );

  // ロゴ
  const logo = screen.getByAltText("logo");
  expect(logo).toBeInTheDocument();

  // 検索入力
  const searchInputs = screen.getAllByRole("radio");
  expect(searchInputs.length).toBe(3);

  // 検索ボタン
  const searchButton = screen.getByRole("button", { name: "検索" });
  expect(searchButton).toBeInTheDocument();

  // ユーザーアイコン
  const userIcon = screen.getByAltText("ユーザーアイコン");
  expect(userIcon).toBeInTheDocument();

  // ユーザー名
  const userName = screen.getByText(/さん/);
  expect(userName).toBeInTheDocument();

  // ログアウトボタン
  const logoutButton = screen.getByAltText("ログアウト");
  expect(logoutButton).toBeInTheDocument();

  // メニューアイテムのリンク
  const menuItemLinks = screen.getAllByRole("link");
  expect(menuItemLinks.length).toBe(7);
});
