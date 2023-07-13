import FetchIslandData from '../../components/fetchIslandData';
import { supabase } from '../path/to/createClient';

// supabaseモジュールのモックを作成する例
jest.mock('../path/to/createClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
    })),
  },

  test('FetchIslandData 関数が正しく動作すること', async () => {
    // テストに必要なデータやモックをセットアップ
  
    const paramsID = 123; // テストに使用するID
    const setIslandName = jest.fn(); // モック関数
    const setIsland = jest.fn(); // モック関数
    const setIsButtonsVisible = jest.fn(); // モック関数
  
    // supabaseモジュールのfrom関数のモックを設定
    supabase.from.mockReturnValueOnce({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(() => ({ data: { islandName: 'テスト島', id: 456 }, error: null })),
    });
  
    // 関数を実行
    await FetchIslandData(paramsID, setIslandName, setIsland, setIsButtonsVisible);
  
    // 期待される結果を検証するアサーションを記述
    expect(setIslandName).toHaveBeenCalledWith('テスト島');
    expect(setIsland).toHaveBeenCalledWith({ islandName: 'テスト島', id: 456 });
    expect(setIsButtonsVisible).toHaveBeenCalledWith(true);
  });  
}));
