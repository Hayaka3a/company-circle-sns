import { renderHook, act } from "@testing-library/react-hooks";
import useCreateIslandHandler from "../../../island/create/createHandler";

// モックの準備
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../../../createClient", () => ({
  supabase: {
    from: () => ({
      insert: jest.fn(),
      select: jest.fn(),
    }),
  },
}));
jest.mock("../../../components/cookie/getCookieId", () => () => 1);

test("createHandlerが正しく動作すること", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useCreateIslandHandler(),
  );
  const navigateMock = jest.fn();
  result.current.navigate = navigateMock;

  // サンプルデータを設定
  const islandName = "テスト島";
  const detail = "テスト活動内容";
  const imageUrl = "https://example.com/sample.jpg";
  const islandMembers = [
    { id: 2, Name: "山田太郎" },
    { id: 3, Name: "田中花子" },
  ];
  const islandTags = [
    { id: 4, Name: "タグ１" },
    { id: 5, Name: "タグ２" },
  ];
  const tagNames = [{ Name: "新しいタグ" }];

  act(() => {
    // フックの状態を更新
    result.current.setIslandName(islandName);
    result.current.setDetail(detail);
    result.current.setImageUrl(imageUrl);
    result.current.setIslandMembers(islandMembers);
    result.current.setIslandTags(islandTags);
    result.current.setTagNames(tagNames);
  });

  // createHandlerを呼び出す
  await act(async () => {
    await result.current.createHandler();
  });
});
