import { render, screen, fireEvent } from "@testing-library/react";
import CreateThread from "../../../components/modalWindows/createThread";
describe("CreateThread", () => {
  test("表示テスト", async () => {
    const closeModal = jest.fn();
    const islandID = 1;
    const eventID = null;

    render(
      <CreateThread
        closeModal={closeModal}
        islandID={islandID}
        eventID={eventID}
      />,
    );

    expect(screen.getByText(/島/)).toBeInTheDocument();
    expect(screen.getByText(/スレッド名/)).toBeInTheDocument();
    expect(screen.getByText(/新規スレッド作成/)).toBeInTheDocument();

    const threadTitleInput = screen.getByRole("textbox");
    expect(threadTitleInput).toBeInTheDocument();

    const createButton = screen.getByRole("button", { name: "作成" });
    expect(createButton).toBeInTheDocument();
    expect(createButton).toBeDisabled();

    // 入力欄にテキストを入力する
    fireEvent.change(threadTitleInput, { target: { value: "テストスレッド" } });

    // 入力欄の値が更新され、作成ボタンが有効になっていることを確認する
    expect(threadTitleInput.value).toBe("テストスレッド");
    expect(createButton).not.toBeDisabled();
  });
});
