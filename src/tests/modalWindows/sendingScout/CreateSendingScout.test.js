import { render, fireEvent, getByRole } from "@testing-library/react";
import CreateSendingScout from "../../../components/modalWindows/sendingScout/createSendingScout";

describe("CreateSendingScout", () => {
  const closeModal = jest.fn();
  const table = "island";
  const islandName = "";

  test("コンポーネントが正しくレンダリングされること", () => {
    const { getByText, getByLabelText, getByRole } = render(
      <CreateSendingScout closeModal={closeModal} table={table} />,
    );

    // 要素が正しくレンダリングされているか確認する
    expect(getByRole("img", { name: /×ボタン/ })).toBeInTheDocument();
    expect(getByText(`${islandName}島へ招待する`)).toBeInTheDocument();
    expect(getByLabelText(/送るユーザー/)).toBeInTheDocument();
    expect(getByLabelText(/コメント/)).toBeInTheDocument();
    expect(getByText(/送信/)).toBeInTheDocument();
  });

  test("クローズボタンがクリックされたときにcloseModalが呼ばれること", () => {
    const { getByRole } = render(
      <CreateSendingScout closeModal={closeModal} table={table} />,
    );

    const closeButton = getByRole("img", { name: /×ボタン/ });
    fireEvent.click(closeButton);

    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  // 他の機能やユーザーの操作に関するテストケースを追加してください
});
