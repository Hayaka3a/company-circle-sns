import HandleChange from "../../../../components/createEvent/daytime/handleChange";

// モック関数を作成
const mockSetStartDate = jest.fn();
const mockSetEndDate = jest.fn();
const mockSetError = jest.fn();

// テストケース
describe("HandleChange", () => {
  afterEach(() => {
    // 各テストケース後にモック関数の呼び出し状態をリセット
    mockSetStartDate.mockClear();
    mockSetEndDate.mockClear();
    mockSetError.mockClear();
  });

  test('typeが"start"の場合、setStartDateが適切な引数で呼び出される', () => {
    const handleChange = HandleChange({
      setStartDate: mockSetStartDate,
      setEndDate: mockSetEndDate,
      error: "",
      setError: mockSetError,
      type: "start",
    });

    const event = { target: { value: "2023-07-19" } };
    handleChange(event);

    // setStartDateが適切な引数で1回呼び出されたか確認
    expect(mockSetStartDate).toHaveBeenCalledTimes(1);
    expect(mockSetStartDate).toHaveBeenCalledWith("2023-07-19");

    // setErrorが呼び出されていないことを確認
    expect(mockSetError).not.toHaveBeenCalled();
  });

  test('typeが"end"の場合、setEndDateが適切な引数で呼び出される', () => {
    const handleChange = HandleChange({
      setStartDate: mockSetStartDate,
      setEndDate: mockSetEndDate,
      error: "",
      setError: mockSetError,
      type: "end",
    });

    const event = { target: { value: "2023-07-20" } };
    handleChange(event);

    // setEndDateが適切な引数で1回呼び出されたか確認
    expect(mockSetEndDate).toHaveBeenCalledTimes(1);
    expect(mockSetEndDate).toHaveBeenCalledWith("2023-07-20");

    // setErrorが呼び出されていないことを確認
    expect(mockSetError).not.toHaveBeenCalled();
  });

  test("errorが設定されている場合、handleChangeが呼ばれるとsetErrorが空文字で呼び出される", () => {
    const handleChange = HandleChange({
      setStartDate: mockSetStartDate,
      setEndDate: mockSetEndDate,
      error: "エラーメッセージ",
      setError: mockSetError,
      type: "start",
    });

    const event = { target: { value: "2023-07-19" } };
    handleChange(event);

    // setErrorが空文字で1回呼び出されたか確認
    expect(mockSetError).toHaveBeenCalledTimes(1);
    expect(mockSetError).toHaveBeenCalledWith("");

    // setStartDateが呼び出されたかどうか確認
    expect(mockSetStartDate).toHaveBeenCalledTimes(1);
    expect(mockSetStartDate).toHaveBeenCalledWith("2023-07-19");
  });
});
