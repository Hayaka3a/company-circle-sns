import HandleNameChange from "../../../../components/createIsland/islandName/handleNameChange";

// モック関数を作成
const mockSetName = jest.fn();
const mockSetNameError = jest.fn();
const mockSetNameAlreadyError = jest.fn();

// テストケース
describe("HandleNameChange", () => {
  afterEach(() => {
    // 各テストケース後にモック関数の呼び出し状況をリセット
    mockSetName.mockClear();
    mockSetNameError.mockClear();
    mockSetNameAlreadyError.mockClear();
  });

  test("handleNameChangeが呼ばれるとsetNameが適切な引数で呼び出される", () => {
    const handleNameChange = HandleNameChange({
      NameError: "",
      setName: mockSetName,
      setNameError: mockSetNameError,
      setNameAlreadyError: mockSetNameAlreadyError,
      nameAlreadyError: "",
    });

    const event = { target: { value: "New Name" } };
    handleNameChange(event);

    // setNameが適切な引数で1回呼び出されたか確認
    expect(mockSetName).toHaveBeenCalledTimes(1);
    expect(mockSetName).toHaveBeenCalledWith("New Name");

    // setNameErrorとsetNameAlreadyErrorが呼び出されていないことを確認
    expect(mockSetNameError).not.toHaveBeenCalled();
    expect(mockSetNameAlreadyError).not.toHaveBeenCalled();
  });

  test("NameErrorが設定されている場合、handleNameChangeが呼ばれるとsetNameErrorが空文字で呼び出される", () => {
    const handleNameChange = HandleNameChange({
      NameError: "エラーメッセージ",
      setName: mockSetName,
      setNameError: mockSetNameError,
      setNameAlreadyError: mockSetNameAlreadyError,
      nameAlreadyError: "",
    });

    const event = { target: { value: "New Name" } };
    handleNameChange(event);

    // setNameErrorが空文字で1回呼び出されたか確認
    expect(mockSetNameError).toHaveBeenCalledTimes(1);
    expect(mockSetNameError).toHaveBeenCalledWith("");

    // setNameとsetNameAlreadyErrorが呼び出されたかどうか確認
    expect(mockSetName).toHaveBeenCalledTimes(1);
    expect(mockSetName).toHaveBeenCalledWith("New Name");
    expect(mockSetNameAlreadyError).not.toHaveBeenCalled();
  });

  test("nameAlreadyErrorが設定されている場合、handleNameChangeが呼ばれるとsetNameAlreadyErrorが空文字で呼び出される", () => {
    const handleNameChange = HandleNameChange({
      NameError: "",
      setName: mockSetName,
      setNameError: mockSetNameError,
      setNameAlreadyError: mockSetNameAlreadyError,
      nameAlreadyError: "重複エラーメッセージ",
    });

    const event = { target: { value: "New Name" } };
    handleNameChange(event);

    // setNameAlreadyErrorが空文字で1回呼び出されたか確認
    expect(mockSetNameAlreadyError).toHaveBeenCalledTimes(1);
    expect(mockSetNameAlreadyError).toHaveBeenCalledWith("");

    // setNameとsetNameErrorが呼び出されたかどうか確認
    expect(mockSetName).toHaveBeenCalledTimes(1);
    expect(mockSetName).toHaveBeenCalledWith("New Name");
    expect(mockSetNameError).not.toHaveBeenCalled();
  });
});
