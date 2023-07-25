import HandleDetailChange from "../../../../components/createIsland/detail/handleDetailChange";

// モック関数を作成
const mockSetDetail = jest.fn();
const mockSetError = jest.fn();

// テストケース
describe("HandleDetailChange", () => {
  afterEach(() => {
    // 各テストケース後にモック関数の呼び出し状態をリセット
    mockSetDetail.mockClear();
    mockSetError.mockClear();
  });

  test("errorが設定されていない場合、setDetailが適切な引数で呼び出されること", () => {
    const handleIslandDetailChange = HandleDetailChange({
      setDetail: mockSetDetail,
      error: "",
      setError: mockSetError,
    });

    const event = { target: { value: "Some island detail" } };
    handleIslandDetailChange(event);

    // setDetailが適切な引数で1回呼び出されたか確認
    expect(mockSetDetail).toHaveBeenCalledTimes(1);
    expect(mockSetDetail).toHaveBeenCalledWith("Some island detail");

    // setErrorが呼び出されていないことを確認
    expect(mockSetError).not.toHaveBeenCalled();
  });

  test("errorが設定されている場合、setErrorが空文字で呼び出されること", () => {
    const handleIslandDetailChange = HandleDetailChange({
      setDetail: mockSetDetail,
      error: "エラーメッセージ",
      setError: mockSetError,
    });

    const event = { target: { value: "Some island detail" } };
    handleIslandDetailChange(event);

    // setErrorが空文字で1回呼び出されたか確認
    expect(mockSetError).toHaveBeenCalledTimes(1);
    expect(mockSetError).toHaveBeenCalledWith("");

    // setDetailが呼び出されたかどうか確認
    expect(mockSetDetail).toHaveBeenCalledTimes(1);
    expect(mockSetDetail).toHaveBeenCalledWith("Some island detail");
  });
});
