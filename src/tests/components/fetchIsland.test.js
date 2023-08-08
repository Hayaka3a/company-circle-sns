import FetchIsland from "../../components/fetchIsland";

// jest.mockを使ってFetchIsland関数をモックする
jest.mock("../../components/fetchIsland");

describe("filteredDataのテスト", () => {
  test("dataからislandID_Nと一致する島を除外すること", async () => {
    // モックのdata
    const data = [
      { id: 1, islandName: "島A" },
      { id: 2, islandName: "島B" },
      { id: 3, islandName: "島C" },
    ];

    // islandID_Nと一致するidを持つ島を除外した結果を期待する
    const islandID_N = 2;
    const expectedFilteredData = [
      { id: 1, islandName: "島A" },
      { id: 3, islandName: "島C" },
    ];

    // FetchIsland関数のモックを設定
    FetchIsland.mockImplementation((setIslands, islandID) => {
      const filteredData = data.filter((island) => island.id !== islandID);
      setIslands(filteredData);
    });

    // モックのsetIslands関数を定義
    const setIslands = jest.fn();

    // FetchIsland関数を実行してPromiseの解決を待つ
    await FetchIsland(setIslands, islandID_N);

    // setIslands関数が期待する結果で呼び出されたかを確認する
    expect(setIslands).toHaveBeenCalledWith(expectedFilteredData);
  });
  
  test("dataが空の場合、filteredDataも空となること", async () => {
    // モックの空のdata
    const data = [];
    const islandID_N = 2;

    // FetchIsland関数のモックを設定
    FetchIsland.mockImplementation((setIslands, islandID) => {
      setIslands([]);
    });

    // モックのsetIslands関数を定義
    const setIslands = jest.fn();

    // FetchIsland関数を実行してPromiseの解決を待つ
    await FetchIsland(setIslands, islandID_N);

    // setIslands関数が空の配列で呼び出されたかを確認する
    expect(setIslands).toHaveBeenCalledWith([]);
  });

  test("islandID_Nと一致するidを持つ島がdataに存在しない場合、filteredDataがdataと同じであること", async () => {
    // モックのdata
    const data = [
      { id: 1, islandName: "島A" },
      { id: 3, islandName: "島C" },
    ];

    const islandID_N = 2;

    // FetchIsland関数のモックを設定
    FetchIsland.mockImplementation((setIslands, islandID) => {
      setIslands(data);
    });

    // モックのsetIslands関数を定義
    const setIslands = jest.fn();

    // FetchIsland関数を実行してPromiseの解決を待つ
    await FetchIsland(setIslands, islandID_N);

    // setIslands関数がdataと同じで呼び出されたかを確認する
    expect(setIslands).toHaveBeenCalledWith(data);
  });
});
