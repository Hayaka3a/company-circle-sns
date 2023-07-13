import { renderHook } from "@testing-library/react-hooks";
import { useCookies } from "react-cookie";
import GetCookieID from "../../components/cookie/getCookieId";
import { createRoot } from "react-dom/client";

// useCookies関数のモックを作成（実際のcookieの値に依存せずテスト実行するため）
// .mockプロパティ: 返り値の確認ができる
// jest.mock()関数: モジュールを自動的にモックできる
jest.mock("react-cookie", () => ({
  useCookies: jest.fn(),
}));

describe("GetCookieID", () => {
  it("cookieに入れた値と同じ値が返ってくるか", () => {
    const testId = "56"; // テスト用のIDの値
    const cookiesMock = [{ id: testId }];
    // useCookiesが呼び出されたときに、cookiesMockを返す
    useCookies.mockReturnValue(cookiesMock);

    // createRoot(react18以降で使用): reactの新しいエントリーポイント作成。
    // 仮のHTMLを渡すことで、reactコンポーネントツリーをその要素にマウント（表示）できる。
    // document.createElement("div")で仮のHTML要素を作成し、createRootに渡す。
    createRoot(document.createElement("div")).render(() => {
      const { result } = renderHook(() => GetCookieID());
      expect(result.current).toBe(testId);
    });
  });
});
