import { render, fireEvent } from "@testing-library/react";
import CreateSendingScout from "../../../../components/modalWindows/sendingScout/createSendingScout";

describe("CreateSendingScout", () => {
  const closeModal = jest.fn();
  const table = "island";

  test("コンポーネントを正しくレンダリング", () => {
    const { getByText, getByLabelText, getByRole } = render(
      <CreateSendingScout closeModal={closeModal} table={table} />,
    );

    // 要素が正しくレンダリングされているか確認する
    expect(getByRole("img", { name: /×ボタン/ })).toBeInTheDocument();
    expect(getByText(/招待を送る/)).toBeInTheDocument();
    expect(getByLabelText(/送るユーザー/)).toBeInTheDocument();
    expect(getByLabelText(/コメント/)).toBeInTheDocument();
    expect(getByText(/送信/)).toBeInTheDocument();
  });

  test("クローズボタンがクリックされたときにcloseModalが呼ばれる", () => {
    const { getByRole } = render(
      <CreateSendingScout closeModal={closeModal} table={table} />,
    );

    const closeButton = getByRole("img", { name: /×ボタン/ });
    fireEvent.click(closeButton);

    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});
