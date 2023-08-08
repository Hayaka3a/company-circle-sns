import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import EventEdit from '../../event/edit';
import { MemoryRouter } from 'react-router-dom';

describe('EventEditコンポーネント', () => {
  test('テキストが表示されること', () => {
    render(
      <MemoryRouter>
        <EventEdit />
      </MemoryRouter>
    );
    expect(screen.getByText('イベント編集・削除')).toBeInTheDocument();
    expect(screen.getByText('イベント名')).toBeInTheDocument();
    expect(screen.getByText('サムネイル')).toBeInTheDocument();
    expect(screen.getByText('開催日時')).toBeInTheDocument();
    expect(screen.getByText('参加島（サークル）')).toBeInTheDocument();
  });

  test('保存/編集ボタンが正しく動作すること', () => {
    render(
      <MemoryRouter>
        <EventEdit />
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
          <EventEdit />
        </MemoryRouter>
      );  
    const deleteButton = screen.getByText('削除');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText('イベントを削除してもよろしいですか？')).toBeInTheDocument();
    });
  });
});
