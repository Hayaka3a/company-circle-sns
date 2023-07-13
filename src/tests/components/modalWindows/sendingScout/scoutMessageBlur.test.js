import { scoutMessageBlur } from "../../../components/modalWindows/sendingScout/scoutMessageBlur";

describe("scoutMessageBlur", () => {
  test("メッセージが未入力の場合", () => {
    const setmessageError = jest.fn();

    scoutMessageBlur({
      message: "",
      setmessageError,
    });

    expect(setmessageError).toHaveBeenCalledWith("※コメントは入力必須項目です");
  });

  test("メッセージが正しく入力されている場合", () => {
    const setmessageError = jest.fn();

    scoutMessageBlur({
      message: "Hello",
      setmessageError,
    });

    expect(setmessageError).toHaveBeenCalledWith("");
  });
});
