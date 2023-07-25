import FetchData from "../../../../components/menubar/menubarEvent/fetchData";

describe("FetchData", () => {
  it("データ取得に失敗したら、isJoinedで空配列からfalseを返す", async () => {
    // テスト用のユーザーIDとイベントID
    const userID = "testUserID";
    const paramsID = 123;

    // FetchData関数を呼び出す
    const result = await FetchData(userID, paramsID);

    // 期待される結果
    const expectedUniqueEvents = [];
    const expectedIsJoined = false;

    // 結果を検証
    expect(result.uniqueEvents).toEqual(expectedUniqueEvents);
    expect(result.isJoined).toEqual(expectedIsJoined);
  });
});
