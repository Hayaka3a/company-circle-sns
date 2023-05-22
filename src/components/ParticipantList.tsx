import styles from "../styles/participantList.module.css";

export default function ParticipantList(props: { table: string }) {
  //DB作成後置き換え
  const entryUsers = [
    { userID: 1, familyName: "田中", firstName: "太郎", icon: "/image1" },
    { userID: 2, familyName: "佐藤", firstName: "良子", icon: "/image2" },
  ];
  const loginUser = {
    userID: 1,
    familyName: "田中",
    firstName: "太郎",
    icon: "/image1",
  };
  const island = { ownerID: 1 };

  //ログインユーザーが参加者の場合、EntryUsersからログインユーザーのデータを抜き出す
  const newEntryUsers = entryUsers.filter(
    (user) => user.userID !== loginUser.userID,
  );

  //自分以外のユーザーの一覧表示
  const anotherUser = (user: any) => {
    return (
      <td className={styles.td}>
        <img src={user.icon} className={styles.icon} />
        {user.familyName}
        {user.firstName}
        {}
      </td>
    );
  };

  function buttonSwitching() {
    //ログインしているユーザーがオーナーだった場合の表示
    if (island.ownerID === loginUser.userID) {
      return (
        <>
            <tr key={loginUser.userID} className={styles.tr}>
              <td className={styles.td}>
                <img src={loginUser.icon} className={styles.icon} />
                {loginUser.familyName}
                {loginUser.firstName}
                (オーナー)
              </td>
              <td className={styles.td}></td>
            </tr>
            {newEntryUsers.map((user) => {
              return (
                <tr key={user.userID}>
                  {anotherUser(user)}
                  <td>
                    <button>島主権限を譲渡</button>
                    <button>島追放</button>
                  </td>
                </tr>
              );
            })}
        </>
      );
    } else if (entryUsers.some((user) => user.userID === loginUser.userID)) {
      //ログインしているユーザーが住民・参加者だった場合の表示
      return (
        <>
          <tr key={loginUser.userID}>
            <td>
              <img src={loginUser.icon} />
              {loginUser.familyName}
              {loginUser.firstName}
            </td>
            <td>
              <button>島を抜ける</button>
            </td>
          </tr>
          {newEntryUsers.map((user) => {
            return (
              <tr key={user.userID}>
                {anotherUser(user)}
                <td></td>
              </tr>
            );
          })}
        </>
      );
    } else {
      //未参加ユーザーへの表示
      return (
        <>
          {entryUsers.map((user) => {
            return (
              <tr key={user.userID}>
                {anotherUser(user)}
                <td></td>
              </tr>
            );
          })}
        </>
      );
    }
  }
  return (
    <>
      <div className={styles.main}>
        <h2>{props.table === "island" ? "島民" : "参加者"}一覧</h2>
        <table className={styles.table}>
          <tbody className={styles.tbody}>{buttonSwitching()}</tbody>
        </table>
      </div>
    </>
  );
}
