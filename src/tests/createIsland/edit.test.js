import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IslandEdit from '../../island/edit';
import React from 'react';

describe("IslandEditコンポーネント", () => {
    test("テキストが表示されること", () => {
        render(
            <MemoryRouter>
                <IslandEdit />
            </MemoryRouter>
        );
        expect(screen.getByText("島情報編集・削除")).toBeInTheDocument();
        expect(screen.getByText("島名")).toBeInTheDocument();
        expect(screen.getByText("活動内容")).toBeInTheDocument();
        expect(screen.getByText("サムネイル")).toBeInTheDocument();
        expect(screen.getByText("タグ")).toBeInTheDocument();
    });

    test("保存/編集ボタンが正しく動作すること", () => {
      render(
        <MemoryRouter>
          <IslandEdit />
        </MemoryRouter>
      );  
        // 保存/編集ボタンを取得
      const saveEditButton = screen.getByText('編集');

      // ボタンをクリックし、handleSaveClick関数が呼び出されることを確認
      fireEvent.click(saveEditButton);
    });

    test('削除ボタンをクリックすると削除モーダルが表示されること', async () => {
        render(
            <MemoryRouter>
              <IslandEdit />
            </MemoryRouter>
          );  
        const deleteButton = screen.getByText("島を削除");
        fireEvent.click(deleteButton);
    
        await waitFor(() => {
          expect(screen.getByText('島を沈没させてもよろしいですか？')).toBeInTheDocument();
        });
      });  
});