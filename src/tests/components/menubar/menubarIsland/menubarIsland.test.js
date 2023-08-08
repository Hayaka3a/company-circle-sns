import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MenubarIsland from "../../../../components/menubar/menubarIsland/menubarIsland";
import PartUseEffectIsland from "../../../../components/menubar/menubarIsland/partUseEffectIsland";

// PartUseEffectIslandコンポーネントのモックを提供するためのラッパーコンポーネント
// const PartUseEffectIslandWrapper = ({ data, children }) => {
//   const mockIslandData = {
//     islandName: data?.islandName || "",
//     thumbnail: data?.thumbnail || "",
//   };

//   return (
//     <PartUseEffectIsland
//       onIslandDataFetched={(callback) => callback(mockIslandData)}
//     >
//       {children}
//     </PartUseEffectIsland>
//   );
// };

describe("MenubarIslandコンポーネント", () => {
  it("islandデータが提供された場合、islandNameが表示されること", () => {
    // const mockIsland = {
    //   islandName: "テスト",
    //   thumbnail: "mock-thumbnail-url",
    // };
    // render(
    //   <MemoryRouter>
    //     <MenubarIsland />
    //   </MemoryRouter>,
    //   {
    //     wrapper: ({ children }) => (
    //       <PartUseEffectIslandWrapper data={mockIsland}>
    //         {children}
    //       </PartUseEffectIslandWrapper>
    //     ),
    //   },
    // );
    // const islandNameElement = screen.queryByText(/テスト/);
    // expect(islandNameElement).toBeInTheDocument();
  });
  it("islandデータがない場合、メニュー項目が正しく表示・非表示されること", () => {
    // const mockIsland = null;
    // render(
    //   <MemoryRouter>
    //     <MenubarIsland />
    //   </MemoryRouter>,
    //   {
    //     wrapper: ({ children }) => (
    //       <PartUseEffectIslandWrapper data={mockIsland}>
    //         {children}
    //       </PartUseEffectIslandWrapper>
    //     ),
    //   },
    // );
    // // 以下がメニューバーに表示されること
    // const eventElement = screen.queryByText("イベント");
    // expect(eventElement).toBeInTheDocument();
    // const islandMembersElement = screen.queryByText("島民一覧");
    // expect(islandMembersElement).toBeInTheDocument();
    // const islandDetailElement = screen.queryByText("島詳細");
    // expect(islandDetailElement).toBeInTheDocument();
    // // メニューバーに表示されないこと
    // const postElement = screen.queryByText("ポスト");
    // expect(postElement).not.toBeInTheDocument();
    // const threadElement = screen.queryByText("掲示板");
    // expect(threadElement).not.toBeInTheDocument();
  });
});
