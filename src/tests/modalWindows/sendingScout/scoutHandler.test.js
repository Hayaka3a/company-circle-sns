import { scoutHandler } from "../../../components/modalWindows/sendingScout/scoutHandler";
import { supabase } from "../../../createClient";

// jest.mockを使用してsupabaseモジュールをモックする
jest.mock("../../../createClient", () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    insert: jest.fn(),
  },
}));

describe("scoutHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call setEmpty when islandMembers is falsy or empty", async () => {
    const setEmpty = jest.fn();
    const post = "postID";
    const message = "Hello";
    const postBy = "user123";
    const closeModal = jest.fn();

    // islandMembersを空に設定
    const islandMembers = [];

    await scoutHandler({
      islandMembers,
      setEmpty,
      post,
      message,
      postBy,
      closeModal,
    });

    // setEmptyが呼び出されたことを確認
    expect(setEmpty).toHaveBeenCalledWith(
      "「追加」ボタンを押下してユーザーを選択してください。",
    );
    // supabaseの関連メソッドが呼び出されていないことを確認
    expect(supabase.from).not.toHaveBeenCalled();
    expect(supabase.insert).not.toHaveBeenCalled();
    // closeModalが呼び出されていないことを確認
    expect(closeModal).not.toHaveBeenCalled();
  });

  test("should call console.log when supabase insert returns an error", async () => {
    const setEmpty = jest.fn();
    const post = "postID";
    const message = "Hello";
    const postBy = "user123";
    const closeModal = jest.fn();

    // supabase.insertがエラーを返すようにモックする
    const error = new Error("Supabase error");
    supabase.from().insert.mockResolvedValue({ error });

    // islandMembersを設定
    const islandMembers = ["member1", "member2"];

    await scoutHandler({
      islandMembers,
      setEmpty,
      post,
      message,
      postBy,
      closeModal,
    });

    // console.logが呼び出されたことを確認
    expect(console.log).toHaveBeenCalledWith(error, "エラー");
    // setEmptyが呼び出されていないことを確認
    expect(setEmpty).not.toHaveBeenCalled();
    // closeModalが呼び出されていないことを確認
    expect(closeModal).not.toHaveBeenCalled();
  });

  test("should call closeModal when supabase insert is successful", async () => {
    const setEmpty = jest.fn();
    const post = "postID";
    const message = "Hello";
    const postBy = "user123";
    const closeModal = jest.fn();

    // supabase.insertがエラーを返さないようにモックする
    supabase.from().insert.mockResolvedValue({ error: null });

    // islandMembersを設定
    const islandMembers = ["member1", "member2"];

    await scoutHandler({
      islandMembers,
      setEmpty,
      post,
      message,
      postBy,
      closeModal,
    });

    // closeModalが呼び出されたことを確認
    expect(closeModal).toHaveBeenCalled();
    // setEmptyが呼び出されていないことを確認
    expect(setEmpty).not.toHaveBeenCalled();
    // console.logが呼び出されていないことを確認
    expect(console.log).not.toHaveBeenCalled();
  });
});
