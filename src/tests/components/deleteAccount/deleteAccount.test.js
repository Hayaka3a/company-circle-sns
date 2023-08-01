import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter or BrowserRouter
import "@testing-library/jest-dom/extend-expect";
import DeleteAcount from "../../../components/deleteAccount/deleteAcount";

test("renders 退会 button", () => {
  const { getByText } = render(
    // MemoryRouter: ルーティング関連のコードがテスト中でも適切に動作するように
    // コンポーネントの表示・非表示を管理するためにReact Routerなどのルーティングライブラリを使用しているから
    <MemoryRouter>
      <DeleteAcount />
    </MemoryRouter>,
  );
  const buttonElement = getByText("退会");
  expect(buttonElement).toBeInTheDocument();
});
