import { render } from "@testing-library/react";
import Thread from "../../components/Thread";

// useNavigateをモック化
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

// テスト用のスレッドデータ
const dummyThreadData = [
  {
    id: 1,
    threadTitle: "テストスレッド1",
  },
  {
    id: 2,
    threadTitle: "テストスレッド2",
  },
];

test("スレッドが表示されていること", () => {
  const { getByText, getAllByTestId } = render(
    <Thread thread={dummyThreadData} />,
  );

  // ダミースレッドデータのスレッドタイトルが表示されていることを確認
  expect(getByText("テストスレッド1")).toBeInTheDocument();
  expect(getByText("テストスレッド2")).toBeInTheDocument();

  //削除ボタンが2つ表示されていることを確認
  const deleteButtons = getAllByTestId("delete");
  expect(deleteButtons).toHaveLength(2);
});
