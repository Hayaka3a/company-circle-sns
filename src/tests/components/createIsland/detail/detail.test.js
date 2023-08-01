import { render, screen, fireEvent } from "@testing-library/react";
import Detail from "../../../../components/createIsland/detail/detail";

describe("Detail", () => {
  test("テキストエリアが表示されるかどうか", () => {
    render(<Detail detail="" setDetail={() => {}} />);

    const textareaElement = screen.getByRole("textbox");
    expect(textareaElement).toBeInTheDocument();
  });
});
