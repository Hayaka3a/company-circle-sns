import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MenubarEvent from "../../../../components/menubar/menubarEvent/menubarEvent";

jest.mock("../../../../components/menubar/menubarEvent/partUseEffect", () => ({
  __esModule: true,
  default: () => ({
    isJoined: true,
    event: {
      eventName: "Test Event",
    },
    eventImage: "test-image-url",
  }),
}));
test("eventが存在する場合、eventNameが表示されること", () => {
  const { getByText } = render(
    <MemoryRouter>
      <MenubarEvent />
    </MemoryRouter>,
  );

  const eventNameElement = getByText("Test Event");
  expect(eventNameElement).toBeInTheDocument();
});

test("isJoinedがtrueのとき、参加者用のメニューバー項目が表示されること", () => {
  render(
    <MemoryRouter>
      <MenubarEvent />
    </MemoryRouter>,
  );

  // 掲示板リンクが表示されているか確認
  const bulletinBoardLink = screen.getByText("掲示板");
  expect(bulletinBoardLink).toBeInTheDocument();

  // ポストリンクが表示されているか確認
  const postLink = screen.getByText("ポスト");
  expect(postLink).toBeInTheDocument();

  // 参加者一覧リンクが表示されているか確認
  const participantsLink = screen.getByText("参加者一覧");
  expect(participantsLink).toBeInTheDocument();

  // イベント詳細リンクが表示されているか確認
  const eventDetailsLink = screen.getByText("イベント詳細");
  expect(eventDetailsLink).toBeInTheDocument();
});

test("isJoinedがfalseのとき、不参加用のメニューバーが表示されること", () => {
  jest.resetModules(); // モジュールをリセット

  // 別のモック実装に切り替える
  // モックの設定を行う前に、モジュールがキャッシュされないようにする
  jest.doMock(
    "../../../../components/menubar/menubarEvent/partUseEffect",
    () => ({
      __esModule: true,
      default: () => ({
        isJoined: false,
        event: {
          eventName: "Test Event",
        },
        eventImage: "test-image-url",
      }),
    }),
  );

  render(
    <MemoryRouter>
      <MenubarEvent paramsID={1} />
    </MemoryRouter>,
  );

  // 参加者一覧リンクが表示されているか確認
  const participantsLink = screen.getByText("参加者一覧");
  expect(participantsLink).toBeInTheDocument();

  // イベント詳細リンクが表示されているか確認
  const eventDetailsLink = screen.getByText("イベント詳細");
  expect(eventDetailsLink).toBeInTheDocument();

  // 掲示板リンクとポストリンクが表示されていないか確認
  expect(screen.queryByText("掲示板")).toBeNull();
  expect(screen.queryByText("ポスト")).toBeNull();
});
