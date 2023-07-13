// 必要なモジュールをインポート
import HandleInputChange from '../../components/modalWindows/handleInputChange';

// ダミーの関数を作成
const setEmptyChara = jest.fn();
const setNotExist = jest.fn();
const setInputValue = jest.fn();

// テストケースを定義
describe('HandleInputChange', () => {
  test('入力が空白文字の場合、適切な処理が行われること', () => {
    // テスト用のイベントオブジェクトを作成
    const event = { target: { value: ' ' } };

    // 関数を呼び出す
    HandleInputChange(event, setEmptyChara, setNotExist, setInputValue);

    // 適切な関数が呼び出されたことを確認
    expect(setEmptyChara).toHaveBeenCalledWith('空白文字は入力できません');
    expect(setNotExist).toHaveBeenCalledWith('');
    expect(setInputValue).not.toHaveBeenCalled();
  });

  test('入力が空白文字以外の場合、適切な処理が行われること', () => {
    // テスト用のイベントオブジェクトを作成
    const event = { target: { value: 'abc' } };

    // 関数を呼び出す
    HandleInputChange(event, setEmptyChara, setNotExist, setInputValue);

    // 適切な関数が呼び出されたことを確認
    expect(setEmptyChara).toHaveBeenCalledWith('');
    expect(setNotExist).not.toHaveBeenCalled();
    expect(setInputValue).toHaveBeenCalledWith('abc');
  });
});
