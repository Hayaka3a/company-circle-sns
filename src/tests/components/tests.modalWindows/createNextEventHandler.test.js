import NextEventHandler from "../../components/modalWindows/nextEventHandler";

describe('NextEventHandler', () => {
  // モック関数を作成
  const supabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
  };

  test('inputValueが空の場合、関数は何も行わずに終了すること', async () => {
    const inputValue = '';
    const id = '123';
    const nextOpen2 = jest.fn();
    const setNotExist = jest.fn();

    // 関数を実行
    await NextEventHandler(inputValue, id, nextOpen2, setNotExist)();

    // 関数が呼び出されたかどうかを確認
    expect(supabase.from).not.toHaveBeenCalled();
    expect(setNotExist).not.toHaveBeenCalled();
    expect(nextOpen2).not.toHaveBeenCalled();
  });

  test('inputValueが正しい場合、関数は正常に実行されること', async () => {
    const inputValue = 'イベント名';
    const id = '123';
    const nextOpen2 = jest.fn();
    const setNotExist = jest.fn();

    // selectメソッドの返り値を設定
    const eventName = 'イベント名';
    const { data } = [{ eventName }];
    supabase.select.mockResolvedValueOnce({ data });

    // 関数を実行
    await NextEventHandler(inputValue, id, nextOpen2, setNotExist)();

    // 関数が呼び出されたかどうかを確認
    expect(supabase.from).toHaveBeenCalledWith('events');
    expect(supabase.select).toHaveBeenCalledWith('eventName');
    expect(supabase.eq).toHaveBeenCalledWith('id', '123');
    expect(supabase.eq).toHaveBeenCalledWith('status', false);
    expect(setNotExist).not.toHaveBeenCalled();
    expect(nextOpen2).toHaveBeenCalled();
  });  
  
  test('inputValueが間違っている場合、setNotExistが呼び出されること', async () => {
    const inputValue = '間違ったイベント名';
    const id = '123';
    const nextOpen2 = jest.fn();
    const setNotExist = jest.fn();

    // supabaseオブジェクトをモック化した関数を作成
    const mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
    };

    // selectメソッドの返り値を設定
    const eventName = '正しいイベント名';
    mockSupabase.select.mockResolvedValueOnce({ data: [{ eventName }] });

    // 関数を実行
    await NextEventHandler(inputValue, id, nextOpen2, setNotExist).apply({ supabase: mockSupabase });

    // 関数が呼び出されたかどうかを確認
    expect(mockSupabase.from).toHaveBeenCalledWith('events');
    expect(mockSupabase.select).toHaveBeenCalledWith('eventName');
    expect(mockSupabase.eq).toHaveBeenCalledWith('id', '123');
    expect(mockSupabase.eq).toHaveBeenCalledWith('status', false);
    expect(setNotExist).toHaveBeenCalledWith('入力されたイベント名が間違っています');
    expect(nextOpen2).not.toHaveBeenCalled();
  });
});
