import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventDetail from "../../event/[id]";

describe("EventDetailコンポーネント", () => {
  test("コンポーネントが正しくレンダリングされるかどうか", () => {
    render(
      <MemoryRouter>
        <EventDetail />
      </MemoryRouter>
    );

    const residentButton = screen.getByText("住民申請");
    expect(residentButton).toBeInTheDocument();

    const messageButton = screen.getByText("メッセージを送る");
    expect(messageButton).toBeInTheDocument();

    const editButton = screen.getByText("編集・削除");
    expect(editButton).toBeInTheDocument();
  });

  test("住民申請ボタンをクリックするとモーダルが表示されるか", () => {
    // テスト対象のコンポーネントをレンダリング
    render(
      <MemoryRouter>
        <EventDetail />
      </MemoryRouter>
    );

    const residentButton = screen.getByText("住民申請");
    fireEvent.click(residentButton);

    const modalTitle = screen.getByText("住民申請");
    expect(modalTitle).toBeInTheDocument();
  });
});
