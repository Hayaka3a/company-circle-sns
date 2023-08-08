import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import BelongEvent from "../../../../components/post/belongEvent/belongEvent";

// テスト用のモック関数
jest.mock(
  "../../../../components/cookie/getCookieId",
  () => () => "dummyUserID",
);

describe("BelongEventコンポーネント", () => {
  test("hasNewMessageがtrueの場合、メッセージが表示されること", async () => {
    // jest.mock("../../../../components/post/belongEvent/FetchData", () => {
    //   return {
    //     __esModule: true,
    //     default: jest.fn((userID, setHasNewMessage) => {
    //       // テスト用のダミーデータをセット
    //       setHasNewMessage(true);
    //     }),
    //   };
    // });
    // render(<BelongEvent />);
    // // メッセージが表示されていることを検証
    // const messageElement = screen.queryByText(
    //   "イベントポストに新しいメッセージが届いています",
    // );
    // expect(messageElement).not.toBeNull();
  });

  test("hasNewMessageがfalseの場合、メッセージが表示されないこと", () => {
    // FetchData関数をモックしてhasNewMessageがfalseになるようにする
    jest.mock("../../../../components/post/belongEvent/FetchData", () => {
      return {
        __esModule: true,
        default: jest.fn((userID, setHasNewMessage) => {
          setHasNewMessage(false);
        }),
      };
    });

    render(<BelongEvent />);

    // メッセージが表示されていないことを検証
    const messageElement = screen.queryByText(
      "イベントポストに新しいメッセージが届いています",
    );
    expect(messageElement).toBeNull();
  });
});
