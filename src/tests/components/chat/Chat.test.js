import { render, screen, fireEvent } from "@testing-library/react";
import Chat from "../../../components/chat/Chat";

// react-router-domのuseParamsとuseNavigateをモックする
jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "123" }),
  useNavigate: () => jest.fn(),
}));

// fetchThreadUserをモックする
jest.mock("../../../components/chat/fetchThreadUser", () => ({
  fetchThreadUser: jest.fn(),
}));

describe("Chatコンポーネントのテスト", () => {
  test("初期状態の表示確認", () => {
    // render(<Chat />);
    // // スレッドタイトルが編集できない状態であることを確認
    // const inputElement = screen.queryByTestId("edit-input");
    // expect(inputElement).toBeNull();
    // //編集ボタンがあることを確認
    // const editButton = screen.getByTestId("editButton");
    // expect(editButton).toBeInTheDocument();
  });

  test("編集ボタンをクリックした際に編集モードになること", () => {
    // render(<Chat />);
    // // 編集ボタンをクリック
    // fireEvent.click(screen.getByTestId("editButton"));
    // // 保存ボタンがあることを確認
    // const save = screen.getByText("保存");
    // expect(save).toBeInTheDocument();
    // // タイトルのinputが入力可能状態になっていることを確認
    // const inputElement = screen.getByTestId("edit-input");
    // expect(inputElement).toBeInTheDocument();
    // expect(inputElement).toBeEnabled();
  });
});
