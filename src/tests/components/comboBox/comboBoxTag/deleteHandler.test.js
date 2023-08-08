import React from "react";
import { render } from "@testing-library/react";
import DeleteHandler from "../../../../components/comboBox/comboBoxTag/deleteHandler";

describe("ComboBoxTagのDeleteHandlerコンポーネント", () => {
  test("削除ボタンをレンダリングできること", () => {
    const { getByText } = render(<DeleteHandler />);

    const deleteButton = getByText("×");
    expect(deleteButton).toBeInTheDocument();
  });
});
