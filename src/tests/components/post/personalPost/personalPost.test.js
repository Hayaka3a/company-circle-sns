import React from "react";
import { render, screen } from "@testing-library/react";
import PersonalPost from "../../../../components/post/personalPost/personalPost";

// テスト用のモック関数
jest.mock(
  "../../../../components/cookie/getCookieId",
  () => () => "dummyUserID",
);

// モック化したFetchData関数を定義
jest.mock("../../../../components/post/personalPost/FetchData", () => {
  return {
    __esModule: true,
    default: jest.fn((userID, setHasNewMessage) => {
      // テスト用のダミーデータをセット
      setHasNewMessage(true);
    }),
  };
});

describe("PersonalPostコンポーネント", () => {
  test("hasNewMessageがtrueの場合、メッセージが表示されること", () => {
    render(<PersonalPost hasNewMessage={true} setHasNewMessage={() => {}} />);

    // メッセージが表示されていることを検証
    const messageElement = screen.getByText(
      "あなたのポストに新しいメッセージが届いています",
    );
    expect(messageElement).toBeInTheDocument();
  });

  test("hasNewMessageがfalseの場合、メッセージが表示されないこと", () => {
    // FetchData関数をモックしてhasNewMessageがfalseになるようにする
    jest.mock("../../../../components/post/personalPost/FetchData", () => {
      return {
        __esModule: true,
        default: jest.fn((userID, setHasNewMessage) => {
          setHasNewMessage(false);
        }),
      };
    });

    render(<PersonalPost hasNewMessage={false} setHasNewMessage={() => {}} />);

    // メッセージが表示されていないことを検証
    const messageElement = screen.queryByText(
      "あなたのポストに新しいメッセージが届いています",
    );
    expect(messageElement).toBeNull();
  });
});
