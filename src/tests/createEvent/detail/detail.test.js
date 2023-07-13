import { render, screen, fireEvent } from "@testing-library/react";
import EventDetail from "../../../components/createEvent/detail/detail";

describe("Detail", () => {
  test("テキストエリアが表示されること", () => {
    render(<EventDetail detail="" setDetail={() => {}} />);

    const textareaElement = screen.getByRole("textbox");
    expect(textareaElement).toBeInTheDocument();
  });

  test("入力値が更新されたら、活動内容が更新されること", () => {
    const setDetail = jest.fn();
    render(<EventDetail detail="" setDetail={setDetail} />);

    const textareaElement = screen.getByRole("textbox");
    fireEvent.change(textareaElement, { target: { value: "New Detail" } });

    expect(setDetail).toHaveBeenCalledWith("New Detail");
  });

  test("入力が空の場合にエラーが表示されること", () => {
    render(<EventDetail detail="" setDetail={() => {}} />);

    const textareaElement = screen.getByRole("textbox");
    // テキストエリアからフォーカスが外れたとき
    fireEvent.blur(textareaElement);

    const errorElement = screen.getByText("※詳細内容は入力必須項目です");
    expect(errorElement).toBeInTheDocument();
  });

  test("入力されている場合にはエラーが表示されないこと", () => {
    render(<EventDetail detail="Valid Detail" setDetail={() => {}} />);

    const textareaElement = screen.getByRole("textbox");
    fireEvent.blur(textareaElement);

    const errorElements = screen.queryAllByRole("alert");
    expect(errorElements.length).toBe(0);
  });
});
