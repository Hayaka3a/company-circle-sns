import NextIslandHandler from "../../components/modalWindows/nextIslnadHandler";

describe('NextIslandHandler', () => {
    // モック関数を作成
    const supabase = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
    };

    test('inputValueが空の場合、関数は何も行わずに終了すること', async () => {
        // テストに必要な入力値やモックをセットアップ
        const inputValue = '';
        const id = '123';
        const nextOpen2 =jest.fn();
        const setNotExist = jest.fn();

        // 関数を実行
        await NextIslandHandler(inputValue, id, nextOpen2, setNotExist)();

        // 関数が呼び出されたかどうかを確認
        expect(supabase.from).not.toHaveBeenCalled();
        expect(setNotExist).not.toHaveBeenCalled();
        expect(nextOpen2).not.toHaveBeenCalled();
    });

    test('入力された島名が一致する場合、nextOpen2が呼び出せれること', async () => {
        const inputValue = 'テスト島';
        const id = '123';
        const nextOpen2 = jest.fn();
        const setNotExist = jest.fn();

        // selectメソッドの返り値を設定
        const islandName = 'テスト島';
        const { data } = [{ islandName }];
        supabase.select.mockResolvedValueOnce({ data });

        await NextIslandHandler(inputValue, id, nextOpen2, setNotExist)();

        expect(supabase.from).toHaveBeenCalledWith('islands');
        expect(supabase.select).toHaveBeenCalledWith('islandName');
        expect(supabase.eq).toHaveBeenCalledWith('id', '123');
        expect(supabase.eq).toHaveBeenCalledWith('status', false);
        expect(setNotExist).not.toHaveBeenCalled();
        expect(nextOpen2).toHaveBeenCalled();
    });

    test('入力された島名が一致しない場合、setNotExistが呼び出されること', async () => {
        const inputValue = '間違った島名';
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
        const eventName = '正しい島名';
        mockSupabase.select.mockRejectedValueOnce({ data: [{ islandName }] });

        await NextIslandHandler(inputValue, id, nextOpen2, setNotExist).apply({ supabase: mockSupabase });

        expect(mockSupabase.from).toHaveBeenCalledWith('island');
        expect(mockSupabase.select).toHaveBeenCalledWith('islandName');
        expect(mockSupabase.eq).toHaveBeenCalledWith('id', '123');
        expect(mockSupabase.eq).toHaveBeenCalledWith('status', false);
        expect(setNotExist).toHaveBeenCalledWith('入力された島名が間違っています');
        expect(nextOpen2).not,toHaveBeenCalled();
    });
});