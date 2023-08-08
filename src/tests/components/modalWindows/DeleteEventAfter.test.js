import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateAfterDelete from "../../../components/modalWindows/deleteEventAfter";

describe("CreateAfterDelete", () => {
    test("モーダルウィンドウが正しく表示され、ボタンが正常に作動すること", () => {
        // deleteHandler関数のmockを作成
        const mockDeleteHandler = jest.fn();

        // コンポーネントをレンダリング
        render(<CreateAfterDelete done={mockDeleteHandler} />);

        // 「イベントを削除しました」テキストが表示されていることを確認
        expect(screen.getByText("イベントを削除しました")).toBeInTheDocument();

        // OKボタンをクリック
        fireEvent.click(screen.getByText("OK"));

        // deleteHandler関数が呼び出されたことを確認
        expect(mockDeleteHandler).toHaveBeenCalled();
    });
});