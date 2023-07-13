import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateAfterDelete from "../../components/modalWindows/createAfterDelete";

describe("CreateAfterDelete", () => {
  test("モーダルウィンドウが正しく表示され、ボタンが正常に作動すること", () => {
    // deleteHandler関数のmockを作成
    const mockDeleteHandler = jest.fn();

    // コンポーネントをレンダリング
    render(<CreateAfterDelete done={mockDeleteHandler} />);

    // 「島は沈没しました」テキストが表示されていることを確認
    expect(screen.getByText("島は沈没しました")).toBeInTheDocument();

    // OKボタンをクリック
    fireEvent.click(screen.getByText("OK"));

    // deleteHandler関数が呼び出されたことを確認
    expect(mockDeleteHandler).toHaveBeenCalled();
  });
});
