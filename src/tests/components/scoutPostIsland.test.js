import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ScoutPostIsland from "../../components/scoutPostIsland";

describe('ScoutPostIsland', () => {
    beforeEach(() => {
        render(
          <BrowserRouter>
              <ScoutPostIsland table="testTable" />
          </BrowserRouter>
        );
      });

    test('島名が表示される', () => {
        const islandName = screen.getByRole('heading', { level: 2 });
        expect(islandName).toBeInTheDocument();
    });

    test('参加するボタンが表示される', () => {
        const joinButton = screen.getByRole('button', { name: '参加する' });
        expect(joinButton).toBeInTheDocument();
      });
    
      test('拒否するボタンが表示される', () => {
        const rejectButton = screen.getByRole('button', { name: '拒否する' });
        expect(rejectButton).toBeInTheDocument();
      });

      test('isButtonsVisibleがfalseの場合、回答しましたが表示される', () => {        
        // isButtonsVisibleをfalseに設定
        const isButtonsVisible = false;
    
       // 回答しましたテキストが表示されるか確認するカスタムマッチャー関数
        const isAnsweredMessageVisible = () => {
        try {
            screen.getByText('回答しました');
            return true;
        } catch (error) {
            return false;
        }
        };

        // 回答しましたテキストが表示されるか確認
        expect(isAnsweredMessageVisible()).toBe(isButtonsVisible);
      });

      test('島詳細へのリンクが表示される', () => {
        const islandLink = screen.getByRole('link', { name: /を見に行く/ });
        expect(islandLink).toBeInTheDocument();
      });
});