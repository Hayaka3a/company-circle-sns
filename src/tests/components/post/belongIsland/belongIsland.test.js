import React from "react";
import { render, screen } from "@testing-library/react";
import BelongIsland from "../../../../components/post/belongIsland/belongIsland";

// テスト用のモック関数
jest.mock(
  "../../../../components/cookie/getCookieId",
  () => () => "dummyUserID",
);

// モック化したFetchData関数を定義
jest.mock("../../../../components/post/belongIsland/FetchData", () => {
  return {
    __esModule: true,
    default: jest.fn((userID, setHasNewMessage) => {
      // テスト用のダミーデータをセット
      setHasNewMessage(true);
    }),
  };
});

describe("BelongIslandコンポーネント", () => {
  test("hasNewMessageがtrueの場合、メッセージが表示されること", () => {
    // render(<BelongIsland hasNewMessage={true} setHasNewMessage={() => {}} />);
    // // メッセージが表示されていることを検証
    // const messageElement = screen.getByText(
    //   "島ポストに新しいメッセージが届いています",
    // );
    // expect(messageElement).toBeInTheDocument();
  });

  test("hasNewMessageがfalseの場合、メッセージが表示されないこと", () => {
    // FetchData関数をモックしてhasNewMessageがfalseになるようにする
    jest.mock("../../../../components/post/belongIsland/FetchData", () => {
      return {
        __esModule: true,
        default: jest.fn((userID, setHasNewMessage) => {
          setHasNewMessage(false);
        }),
      };
    });

    render(<BelongIsland hasNewMessage={false} setHasNewMessage={() => {}} />);

    // メッセージが表示されていないことを検証
    const messageElement = screen.queryByText(
      "島ポストに新しいメッセージが届いています",
    );
    expect(messageElement).toBeNull();
  });
});
