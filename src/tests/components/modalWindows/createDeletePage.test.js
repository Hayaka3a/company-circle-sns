import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CreateDeletePage from "../../../components/modalWindows/createDeletePage";

describe("CreateDeletePage", () => {
  test("×ボタンが押されたときに closeDeleteModal 関数が呼ばれること", () => {
    const closeDeleteModal = jest.fn();
    const nextOpen = jest.fn();
    render(
      <CreateDeletePage closeDeleteModal={closeDeleteModal} nextOpen={nextOpen} />
    );

    // ×ボタンをクリックする
    const closeButton = screen.getByAltText("×ボタン");
    fireEvent.click(closeButton);

    // closeDeleteModal関数が1回呼び出されたことを確認
    expect(closeDeleteModal).toHaveBeenCalledTimes(1);

    // 「島を沈没（削除）させる」ボタンをクリック
    const deleteButton = screen.getByText("島を沈没（削除）させる");
    fireEvent.click(deleteButton);

    // nextOpen関数が1回呼び出されたことを確認
    expect(nextOpen).toHaveBeenCalledTimes(1);

    // 「島を沈没させてもよろしいですか？」テキストが表示されていることを確認
    expect(screen.getByText("島を沈没させてもよろしいですか？")).toBeInTheDocument();
  });
});
