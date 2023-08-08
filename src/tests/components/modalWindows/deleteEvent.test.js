import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateDeletePage from "../../../components/modalWindows/deleteEvent";

describe("CreateDeletePage", () => {
  test("モーダルウィンドウが正しく表示され、ボタンが正常に動作すること", () => {
    // ×ボタンを押したときに呼び出される関数
    const closeDeleteModal = jest.fn();
    // イベント削除ボタンを押したときに呼び出される関数
    const nextOpen = jest.fn();

    // CreateDeletePageコンポーネントを描画する
    render(
      <CreateDeletePage
        closeDeleteModal={closeDeleteModal}
        nextOpen={nextOpen}
      />
    );

    // 「イベントを削除してもよろしいですか？」というテキストが表示されていることを確認
    expect(screen.getByText("イベントを削除してもよろしいですか？")).toBeInTheDocument();

    // ×ボタンをクリックする
    fireEvent.click(screen.getByAltText("×ボタン"));

    // closeDeleteModal関数が1回呼び出されたことを確認
    expect(closeDeleteModal).toHaveBeenCalledTimes(1);

    // 「イベントを削除する」ボタンをクリックする
    fireEvent.click(screen.getByText("イベントを削除する"));

    // nextOpen関数が1回呼び出されたことを確認
    expect(nextOpen).toHaveBeenCalledTimes(1);
  });
});
