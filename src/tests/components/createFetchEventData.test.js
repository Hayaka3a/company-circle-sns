import FetchEventData from './FetchEventData';
import { supabase } from '../../createClient';

// Supabaseのモックを作成
jest.mock('../createClient', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn()
  }
}));

describe('FetchEventData', () => {
  test('正常にデータが取得され、関数が正しく動作すること', async () => {
    // モック関数の設定
    const mockMessage = {
      id: 1,
      postedBy: 2
    };
    const mockPost = {
      eventID: 3
    };
    const mockEvent = {
      eventName: 'テストイベント',
      id: 3
    };
    const mockSetEventName = jest.fn();
    const mockSetEvent = jest.fn();
    const mockSetIsButtonsVisible = jest.fn();

    supabase.from().select().eq().single.mockImplementationOnce(() => ({
      data: mockMessage,
      error: null
    }));
    supabase.from().select().eq().single.mockImplementationOnce(() => ({
      data: mockPost,
      error: null
    }));
    supabase.from().select().eq().single.mockImplementationOnce(() => ({
      data: mockEvent,
      error: null
    }));

    // 関数の実行
    await FetchEventData(1, mockSetEventName, mockSetEvent, mockSetIsButtonsVisible);

    // 期待される結果を検証
    expect(supabase.from).toHaveBeenCalledTimes(3);
    expect(supabase.from).toHaveBeenCalledWith('messages');
    expect(supabase.from().select).toHaveBeenCalledWith('*');
    expect(supabase.from().select().eq).toHaveBeenCalledWith('id', 1);
    expect(supabase.from().select().eq().single).toHaveBeenCalledTimes(1);

    expect(supabase.from).toHaveBeenCalledWith('posts');
    expect(supabase.from().select).toHaveBeenCalledWith('*');
    expect(supabase.from().select().eq).toHaveBeenCalledWith('id', 2);
    expect(supabase.from().select().eq().single).toHaveBeenCalledTimes(2);

    expect(supabase.from).toHaveBeenCalledWith('events');
    expect(supabase.from().select).toHaveBeenCalledWith('eventName, id');
    expect(supabase.from().select().eq).toHaveBeenCalledWith('id', 3);
    expect(supabase.from().select().eq().single).toHaveBeenCalledTimes(3);

    expect(mockSetEventName).toHaveBeenCalledWith('テストイベント');
    expect(mockSetEvent).toHaveBeenCalledWith(mockEvent);
    expect(mockSetIsButtonsVisible).toHaveBeenCalledWith(true);
  });
});
