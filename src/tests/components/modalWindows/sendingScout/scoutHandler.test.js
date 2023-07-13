import { scoutHandler } from "../../../../components/modalWindows/sendingScout/scoutHandler";

describe("scoutHandler", () => {
  test("送り先が未入力の際のエラー表示", async () => {
    const setEmpty = jest.fn();
    const closeModal = jest.fn();

    // islandMembersを空に設定
    const islandMembers = [];

    const mockData = {
      islandMembers: islandMembers,
      setEmpty: setEmpty,
      post: 1,
      message: "test message",
      postBy: 2,
      closeModal: closeModal,
    };

    await scoutHandler(mockData);

    // setEmptyが呼び出されるか確認
    expect(setEmpty).toHaveBeenCalledTimes(1);
    expect(setEmpty).toHaveBeenCalledWith(
      "「追加」ボタンを押下してユーザーを選択してください。",
    );
    // closeModalが呼び出されていないことを確認
    expect(closeModal).not.toHaveBeenCalled();
  });
});
