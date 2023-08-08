import { handleSelectChange } from "../../components/handleSelectChange";

// ダミーのイベントオブジェクトとsetTempSelectedValues関数をモックする
const mockEvent = {
    target: {
      selectedOptions: [
        { value: 'option1' },
        { value: 'option2' },
      ],
    },
  };
  const mockSetTempSelectedValues = jest.fn();
  
  // テストケースを記述する
  describe('handleSelectChange関数のテスト', () => {
    test('選択されたオプションが適切に取得される', () => {
      // 関数を呼び出す
      handleSelectChange(mockEvent, mockSetTempSelectedValues);
  
      // 選択されたオプションを確認する
      const expectedSelectedOptions = ['option1', 'option2'];
      expect(mockSetTempSelectedValues).toHaveBeenCalledWith(expectedSelectedOptions);
    });
  
    test('setTempSelectedValues関数が選択されたオプションで正しく呼び出される', () => {
      // 関数を呼び出す
      handleSelectChange(mockEvent, mockSetTempSelectedValues);
  
      // setTempSelectedValues関数が選択されたオプションで呼び出されたことを確認する
      expect(mockSetTempSelectedValues).toHaveBeenCalledWith(['option1', 'option2']);
    });
  });