import HandleReject from "../components/handleReject";

// mockされたsupabaseオブジェクトを作成します
const supabaseMock = {
  from: jest.fn(() => supabaseMock),
  update: jest.fn(() => supabaseMock),
  eq: jest.fn(() => supabaseMock),
  single: jest.fn(() => Promise.resolve({ data: { isAnswered: true }, error: null })),
};

// supabaseモジュールをモックします
jest.mock('../createClient', () => ({
  createClient: jest.fn(() => ({
    supabase: supabaseMock,
  })),
}));

// setIsButtonsVisible関数のモックを作成します
const setIsButtonsVisibleMock = jest.fn();

describe('HandleReject', () => {
  test('メッセージが更新されてボタンが非表示になること', async () => {
    const paramsID = 'messageID';
    const id = 'someID';

    // 関数を実行します
    await HandleReject(paramsID, id, setIsButtonsVisibleMock);

    // supabaseのメソッドが適切に呼び出されたことを確認します
    expect(supabaseMock.from).toHaveBeenCalledWith('messages');
    expect(supabaseMock.update).toHaveBeenCalledWith({ isAnswered: true });
    expect(supabaseMock.eq).toHaveBeenCalledWith('id', paramsID);
    expect(supabaseMock.single).toHaveBeenCalled();

    // setIsButtonsVisibleが適切な引数で呼び出されたことを確認します
    expect(setIsButtonsVisibleMock).toHaveBeenCalledWith(false);
  });

  test('メッセージの更新エラー時にエラーログが出力され、ボタンが非表示にならないこと', async () => {
    const paramsID = 'messageID';
    const id = 'someID';
    const updateError = new Error('メッセージの更新エラー');

    // supabaseのsingleメソッドがエラーを返すようにモックします
    supabaseMock.single.mockResolvedValue({ data: null, error: updateError });

    // 関数を実行します
    await HandleReject(paramsID, id, setIsButtonsVisibleMock);

    // エラーログが適切に出力されたことを確認します
    expect(console.error).toHaveBeenCalledWith('メッセージの更新エラー', updateError);

    // setIsButtonsVisibleが呼び出されなかったことを確認します
    expect(setIsButtonsVisibleMock).not.toHaveBeenCalled();
  });
});
