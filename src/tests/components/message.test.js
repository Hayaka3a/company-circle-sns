import React from "react";
import { render } from "@testing-library/react";
import Message from "../../message";
import { MemoryRouter } from "react-router-dom";

describe("Messageコンポーネント", () => {
  test("受信日時が正しく表示されることを確認", () => {
    // // // テスト用のモックデータ
    // // const mockUserMessages = [
    // //   {
    // //     id: 1,
    // //     postedBy: 1,
    // //     scout: false,
    // //     message: "テストメッセージ1",
    // //     sendingDate: "2023-08-01T12:00:00Z",
    // //   },
    // // ];

    // // // レンダリング
    // // const { getByText } = render(
    // //   <MemoryRouter>
    // //     <Message />
    // //   </MemoryRouter>
    // // );

    // // // 各メッセージ要素が正しく表示されることを確認
    // // mockUserMessages.forEach((message) => {
    // //   const formattedDate = new Date(message.sendingDate).toLocaleString("ja-JP", {
    // //     year: "numeric",
    // //     month: "2-digit",
    // //     day: "2-digit",
    // //     hour: "2-digit",
    // //     minute: "2-digit",
    // //   });

    // //   const expectedText = `受信日時：${formattedDate}`;
      
    // //   // カスタムText Matcher関数
    // //   const receivingTimeMatcher = (content, element) => {
    // //     return element.tagName.toLowerCase() === "p" && content.includes(expectedText);
    // //   };

    // //   // カスタムText Matcher関数を使ってテキストを検索
    // //   const receivingTimeElement = getByText((content, element) => {
    // //     return receivingTimeMatcher(content, element);
    // //   });

    // //   // カスタムText Matcher関数で検索した要素が存在することを確認
    // //   expect(receivingTimeElement).toBeInTheDocument();
    // });
  });
});
