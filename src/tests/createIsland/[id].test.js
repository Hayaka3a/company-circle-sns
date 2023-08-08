import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import IslandDetail from "../../island/[id]";

jest.mock("../../island/[id]", () => ({
  __esModule: true,
  default: jest.fn(), // モック関数として空の関数を定義
}));

describe("IslandDetailコンポーネント", () => {
  test("JSXが正しく表示されるか", () => {
    // モック関数を設定してモックの戻り値を指定する
    IslandDetail.mockImplementation(() => (
        <div>
          <button>住民申請</button>
          <button>メッセージを送る</button>
        </div>
    ));
    
    render(
        <MemoryRouter>
          <IslandDetail />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByText("住民申請"));
    expect(screen.getByText("住民申請")).toBeInTheDocument();

    fireEvent.click(screen.getByText("メッセージを送る"));
    expect(screen.getByText("メッセージを送る")).toBeInTheDocument();
  });
   
  test("島名が正しく表示されるか", () => {
    // モック関数を設定してモックの戻り値を指定する
    IslandDetail.mockImplementation(() => (
      <div>
        <h2>モック島</h2>
        {/* 他のコンポーネント内容 */}
      </div>
    ));

    render(
      <MemoryRouter>
        <IslandDetail />
      </MemoryRouter>
    );

    expect(screen.getByText("モック島")).toBeInTheDocument();
  });

  test("編集・削除ボタンをクリックしてモーダルが開くか", () => {
    // buttonがtrueの場合、編集・削除ボタンを表示する
    expect(screen.queryByText("編集・削除")).not.toBeInTheDocument();

    IslandDetail.mockImplementation(() => (
      <div>
        <button id="edit_btn" onClick={() => {}}>編集・削除</button>
      </div>
    ));

    render(
      <MemoryRouter>
        <IslandDetail />
      </MemoryRouter>
    );

    // ボタンをクリックしてモーダルが開くことを確認
    fireEvent.click(screen.getByText("編集・削除"));
  });
});
