import HandleIslandNameChange from "../../../../components/modalWindows/quitConf/handleInputChange";

describe("HandleIslandNameChange", () => {
  let setEmptyChara;
  let setNotExist;
  let setInputValue;
  let event;

  beforeEach(() => {
    // テストごとに関数とイベントを初期化
    setEmptyChara = jest.fn();
    setNotExist = jest.fn();
    setInputValue = jest.fn();
    event = { target: { value: "" } };
  });

  it("空白文字が値の中に入っていたらエラー文を表示すること", () => {
    event.target.value = "Invalid value with whitespace";
    const handleInputChange = HandleIslandNameChange({
      setEmptyChara,
      setNotExist,
      setInputValue,
    });

    handleInputChange(event);

    expect(setEmptyChara).toHaveBeenCalledWith("空白文字は入力できません");
    expect(setNotExist).toHaveBeenCalledWith("");
    expect(setInputValue).not.toHaveBeenCalled(); // 空白文字の場合は setInputValue は呼び出されない
  });

  it("空白文字が値の中に含まれていなかったら、エラー文を表示しないこと", () => {
    event.target.value = "ValidInput";
    const handleInputChange = HandleIslandNameChange({
      setEmptyChara,
      setNotExist,
      setInputValue,
    });

    handleInputChange(event);

    expect(setInputValue).toHaveBeenCalledWith("ValidInput");
    expect(setEmptyChara).toHaveBeenCalledWith("");
    expect(setNotExist).not.toHaveBeenCalled(); // 空白文字でない場合は setNotExist は呼び出されない
  });
});
