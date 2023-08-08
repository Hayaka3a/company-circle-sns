import { render, screen, fireEvent } from "@testing-library/react";
import DeleteComfirmation from "../../../components/modalWindows/deleteConfirmation/deleteConfirmation";

describe("DeleteComfirmation", () => {
  test("脱退するボタンが表示されること", async () => {
    const closeModal = jest.fn();
    const text = "テストメッセージ";
    const category = "脱退する";
    const islandName = "テスト島";
    const table = "island";
    const params = 1;
    const user = 123;

    render(
      <DeleteComfirmation
        closeModal={closeModal}
        text={text}
        category={category}
        islandName={islandName}
        table={table}
        params={params}
        user={user}
      />,
    );

    const confirmButton = screen.getByRole("button", { name: "はい" });
    expect(confirmButton).toBeInTheDocument();
  });

  test("追放ボタンが表示されること", async () => {
    const closeModal = jest.fn();
    const text = "テストメッセージ";
    const category = "追放";
    const islandName = "テスト島";
    const table = "testTable";
    const params = 1;
    const user = 123;

    render(
      <DeleteComfirmation
        closeModal={closeModal}
        text={text}
        category={category}
        islandName={islandName}
        table={table}
        params={params}
        user={user}
      />,
    );

    const confirmButton = screen.getByRole("button", { name: "はい" });
    expect(confirmButton).toBeInTheDocument();
  });

  test("譲渡ボタンが表示されること", async () => {
    const closeModal = jest.fn();
    const text = "テストメッセージ";
    const category = "譲渡";
    const islandName = "テスト島";
    const table = "testTable";
    const params = 1;
    const user = 123;

    render(
      <DeleteComfirmation
        closeModal={closeModal}
        text={text}
        category={category}
        islandName={islandName}
        table={table}
        params={params}
        user={user}
      />,
    );

    const confirmButton = screen.getByRole("button", { name: "はい" });
    expect(confirmButton).toBeInTheDocument();

    fireEvent.click(confirmButton);
  });
});
