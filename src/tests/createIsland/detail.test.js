import { render, screen, fireEvent } from "@testing-library/react";
import Detail from "../../components/createIsland/detail/detail";

describe("Detail", () => {
  test("テキストエリアが表示されるかどうか", () => {
    render(<Detail detail="" setDetail={() => {}} />);

    const textareaElement = screen.getByRole("textbox");
    expect(textareaElement).toBeInTheDocument();
  });

  test("入力値が更新されたら、活動内容が更新されるかどうか", () => {
    const setDetail = jest.fn();
    render(<Detail detail="" setDetail={setDetail} />);

    const textareaElement = screen.getByRole("textbox");
    fireEvent.change(textareaElement, { target: { value: "New Detail" } });

    expect(setDetail).toHaveBeenCalledWith("New Detail");
  });

  test("入力が空の場合にエラーが表示されるかどうか", () => {
    render(<Detail detail="" setDetail={() => {}} />);

    const textareaElement = screen.getByRole("textbox");
    fireEvent.blur(textareaElement);

    const errorElement = screen.getByText("※活動内容は入力必須項目です");
    expect(errorElement).toBeInTheDocument();
  });

  test("入力が有効な場合にはエラーが表示されないこと", () => {
    render(<Detail detail="Valid Detail" setDetail={() => {}} />);

    const textareaElement = screen.getByRole("textbox");
    fireEvent.blur(textareaElement);

    const errorElements = screen.queryAllByRole("alert");
    expect(errorElements.length).toBe(0);
  });
});
