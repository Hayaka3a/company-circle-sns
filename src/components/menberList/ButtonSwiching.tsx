import styles from "../../styles/membersList.module.css";
import DeleteComfirmation from "../modalWindows/deleteConfirmation/deleteConfirmation";

export function ButtonSwitching({
  loginUser,
  displayData,
  loginID,
  newEntryUsers,
  anotherUser,
  open,
  modal,
  table,
  open2,
  modal2,
  close2,
  entryUsers,
  close,
}) {
  const name = table === "island" ? "島" : "イベント";

  //アカウントがオーナーのときの追放ボタンの表示切替
  const swichingOwnerButton = (user: number) => {
    if (table === "island") {
      return (
        <button onClick={open2} className={styles.exileBtn}>
          島から追放
        </button>
      );
    } else if (table === "event" && user === 0) {
      //難民からイベントに参加した場合のみ追放可能
      return (
        <button onClick={open2} className={styles.exileBtn}>
          イベントから追放
        </button>
      );
    } else {
      //参加島に所属している人はイベントから追放はできない
      return <button className={styles.notExileBtn}>追放できません</button>;
    }
  };

  if (loginUser && displayData.ownerID === loginID) {
    //アカウントがオーナーのときの参加者リスト表示
    return (
      <>
        <tr key={loginID} className={styles.tr}>
          <td className={styles.td}>
            <img src={loginUser.icon} className={styles.icon} alt="アイコン" />
            <div className={styles.name}>
              {loginUser.familyName}
              {loginUser.firstName}&nbsp;({loginUser.department}
              )(オーナー)
            </div>
          </td>
        </tr>
        {loginUser &&
          newEntryUsers.map((user) => {
            return (
              <tr key={user.id} className={styles.tr}>
                {anotherUser(user)}
                <td className={styles.td2}>
                  <button onClick={open} className={styles.ownerBtn}>
                    オーナー権限を譲渡
                  </button>
                  {modal && (
                    <DeleteComfirmation
                      closeModal={close}
                      category={"譲渡"}
                      text={`本当に権限を譲渡しますか？`}
                      table={table}
                      params={displayData.id}
                      user={user.userID}
                    />
                  )}
                  {swichingOwnerButton(user.islandID)}
                  {modal2 && (
                    <DeleteComfirmation
                      closeModal={close2}
                      category={"追放"}
                      text={`本当に追放しますか？`}
                      table={table}
                      params={displayData.id}
                      user={user.users.id}
                    />
                  )}
                </td>
              </tr>
            );
          })}
      </>
    );
  } else if (
    loginUser &&
    entryUsers.some((item) => item.users.id === loginID)
  ) {
    //アカウントが一般参加者のときの参加者リスト表示
    return (
      <>
        <tr key={loginID} className={styles.tr}>
          <td className={styles.td}>
            <img src={loginUser.icon} className={styles.icon} alt="アイコン" />
            <div className={styles.name}>
              {loginUser.familyName}
              {loginUser.firstName}&nbsp;({loginUser.department})
            </div>
          </td>
          <td className={styles.td2}>
            <button
              onClick={open}
              className={styles.unsubBtn}
              name="島を抜ける"
            >
              {name}を抜ける
            </button>
            {modal && (
              <DeleteComfirmation
                closeModal={close}
                category={"脱退する"}
                text={`本当に${name}を抜けますか？`}
                table={table}
                params={displayData.id}
                user={loginID}
              />
            )}
          </td>
        </tr>
        {loginUser &&
          newEntryUsers?.map((user) => {
            return (
              <tr key={user.id}>
                {anotherUser(user)}
                <td className={styles.td2}></td>
              </tr>
            );
          })}
      </>
    );
  } else {
    //未参加者の場合の参加者リスト表示
    return (
      <>
        {loginUser &&
          entryUsers?.map((user) => {
            return (
              <tr key={user.id} className={styles.tr}>
                {anotherUser(user)}
              </tr>
            );
          })}
      </>
    );
  }
}
