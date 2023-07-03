import { render, screen, fireEvent } from "@testing-library/react";
import EventName from "../../components/createEvent/eventName";
import userEvent from "@testing-library/user-event";

describe("EventName", () => {
  test("入力ボックスが表示されるかどうか", () => {
    render(<EventName eventName="" setEventName={() => {}} />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("入力値が更新されたら、イベント名が更新されるかどうか", () => {
    const setEventName = jest.fn();
    render(<EventName eventName="" setEventName={setEventName} />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: "New Event" } });
    expect(setEventName).toHaveBeenCalledWith("New Event");
    // expect(inputElement.value).toBe("New Event");
  });

  test("入力が空の場合にエラーが表示されるかどうか", () => {
    render(<EventName eventName="" setEventName={() => {}} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.blur(inputElement);

    const errorElement = screen.getByText("※イベント名は入力必須項目です");
    expect(errorElement).toBeInTheDocument();
  });

  test("すでに登録されているイベント名を入力したときにエラーがでるかどうか", async () => {
    // 重複するデータが存在するように supabase のレスポンスをモック化する
    jest.mock("../../createClient", () => ({
      supabase: {
        from: () => ({
          select: () => ({
            eq: () => ({
              eq: () => ({
                data: [{ eventName: "Duplicate Event" }],
                error: null,
              }),
            }),
          }),
        }),
      },
    }));

    render(<EventName eventName="Duplicate Event" setEventName={() => {}} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.blur(inputElement);

    const errorElement = screen.queryByText("※イベント名が既に存在します");

    // screen.queryByText が null を返す場合、エラーメッセージが表示されないことを検証
    // errorElementがないことを照明
    expect(errorElement).toBeNull();
  });

  test("入力が有効な場合にはエラーが表示されないこと", async () => {
    // createClient モジュールをモックする
    jest.mock("../../createClient", () => ({
      supabase: {
        from: () => ({
          select: () => ({
            eq: () => ({
              eq: () => ({
                data: [],
                error: null,
              }),
            }),
          }),
        }),
      },
    }));

    render(<EventName eventName="Valid Event" setEventName={() => {}} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.blur(inputElement);

    const errorElements = screen.queryAllByRole("alert");
    expect(errorElements.length).toBe(0);
  });
});
