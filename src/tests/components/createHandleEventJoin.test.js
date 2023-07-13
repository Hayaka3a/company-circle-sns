import HandleEventJoin from "../components/handleEventJoin";

// モックのsupabaseオブジェクト
const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnValue({ data: {}, error: null }),
    update: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
};

// モックのsetIsButtonsVisible関数
const mockSetIsButtonsVisible = jest.fn();

describe("HandleEventJoin", () => {
    afterEach(() => {
    // 各テストケース後にモック関数の呼び出し回数をリセット
    Object.values(mockSupabase).forEach(mockFn => mockFn.mockClear());
    mockSetIsButtonsVisible.mockClear();
    });

    test("正常に処理され、データが更新されること", async () => {
        // モックの応答を設定
        const message = { id: 'messageId', postedBy: 'userId' };
        const posts = [{ eventID: 'eventId' }];
        const entryStatus = [{ userID: 'userId', eventID: 'eventId', status: 'false' }];
    
        mockSupabase.single.mockReturnValueOnce({ data: message, error: null });
        mockSupabase.single.mockReturnValueOnce({ data: posts, error: null });
        mockSupabase.insert.mockReturnValueOnce({ data: entryStatus, error: null });

        // 関数の呼び出し
        await HandleEventJoin('paramsId', 'id', mockSetIsButtonsVisible);

        // Supabaseの呼び出しを検証
        expect(mockSupabase.from).toHaveBeenCalledTimes(2);
        expect(mockSupabase.from).toHaveBeenNthCalledWith(1, 'messages');
        expect(mockSupabase.from).toHaveBeenNthCalledWith(2, 'posts');

        expect(mockSupabase.select).toHaveBeenCalledTimes(2);
        expect(mockSupabase.select).toHaveBeenNthCalledWith(1, '*');
        expect(mockSupabase.select).toHaveBeenNthCalledWith(2, '*');

        expect(mockSupabase.eq).toHaveBeenCalledTimes(2);
        expect(mockSupabase.eq).toHaveBeenNthCalledWith(1, 'id', 'paramsId');
        expect(mockSupabase.eq).toHaveBeenNthCalledWith(2, 'id', 'userId');

        expect(mockSupabase.single).toHaveBeenCalledTimes(2);

        expect(mockSupabase.update).toHaveBeenCalledTimes(1);
        expect(mockSupabase.update).toHaveBeenCalledWith({ isAnswered: true });

        expect(mockSupabase.insert).toHaveBeenCalledTimes(1);
        expect(mockSupabase.insert).toHaveBeenCalledWith([
        { userID: 'id', eventID: 'eventId', status: 'false' },
        ]);

        // setIsButtonsVisible関数の呼び出しを検証
        expect(mockSetIsButtonsVisible).toHaveBeenCalledTimes(1);
        expect(mockSetIsButtonsVisible).toHaveBeenCalledWith(false);

        // コンソールログの呼び出しを検証
        expect(console.error).not.toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledTimes(2);
        expect(console.log).toHaveBeenNthCalledWith(1, 'メッセージのisAnsweredを更新しました');
        expect(console.log).toHaveBeenNthCalledWith(2, 'userEntryStatusにuserID, eventID, status:falseを格納しました'); 
    });    

})