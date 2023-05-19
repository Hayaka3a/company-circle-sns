import OwnerDisplay from "./OwnerDisplay";
import ParticipantDisplay from "./ParticipantDisplay";

export default function ParticipantList(props: { table: string }) {
  //DB作成後置き換え
  const entryUsers = [
    { id: 1, family_name: "田中", first_name: "太郎", icon: "/image1" },
    { id: 2, family_name: "佐藤", first_name: "良子", icon: "/image2" },
  ];
  const loginUser = {
    id: 1,
    family_name: "田中",
    first_name: "太郎",
    icon: "/image1",
  };
  const island = { ownerID: 2 };

  //ログインユーザーが参加者の場合、EntryUsersからログインユーザーのデータを抜き出す
  const newEntryUsers = entryUsers.filter((user) => user.id !== loginUser.id);

  //自分以外のユーザーの一覧表示
  const anotherUser = (user: {
    id: number;
    icon: string;
    family_name: string;
    first_name: string;
  }) => {
    return (
      <td>
        <img src={user.icon} />
        {user.family_name}
        {user.first_name}
        {}
      </td>
    );
  };

  function buttonSwitching() {
    //ログインしているユーザーがオーナーだった場合の表示
    if (island.ownerID === loginUser.id) {
      return (
        <>
          <tr key={loginUser.id}>
            <td>
              <img src={loginUser.icon} />
              {loginUser.family_name}
              {loginUser.first_name}
              (オーナー)
            </td>
            <td></td>
          </tr>
          {newEntryUsers.map((user) => {
            return (
              <tr key={user.id}>
                {anotherUser(user)}
                <td>
                  <button>島主権限を譲渡</button>
                  <button>島追放</button>
                </td>
              </tr>
            );
          })}
        </>
        // <OwnerDisplay
        //   loginUser={loginUser}
        //   newEntryUsers={newEntryUsers}
        //   anotherUser={anotherUser}
        // />
      );
    } else if (entryUsers !== newEntryUsers) {
      //ログインしているユーザーが住民・参加者だった場合の表示
      return (
        <>
          <tr key={loginUser.id}>
            <td>
              <img src={loginUser.icon} />
              {loginUser.family_name}
              {loginUser.first_name}
            </td>
            <td>
              <button>島を抜ける</button>
            </td>
          </tr>
          {newEntryUsers.map((user) => {
            return (
              <tr key={user.id}>
                {anotherUser(user)}
                <td></td>
              </tr>
            );
          })}
        </>
        // <ParticipantDisplay
        //   loginUser={loginUser}
        //   newEntryUsers={newEntryUsers}
        //   anotherUser={anotherUser}
        // />
      );
    } else {
      //未参加者用画面
    }
  }

  return (
    <>
      <h2>{props.table === "island" ? "島民" : "参加者"}一覧</h2>
      <table>
        <tbody>{buttonSwitching()}</tbody>
      </table>
    </>
  );
}
