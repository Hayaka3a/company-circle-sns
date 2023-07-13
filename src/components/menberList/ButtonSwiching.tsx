import styles from "../../styles/membersList.module.css";
import DeleteComfirmation from "../modalWindows/deleteConfirmation";

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
  if (loginUser && displayData.ownerID === loginID) {
    //オーナーの場合のデータ表示
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
                    島主権限を譲渡
                  </button>
                  {modal && (
                    <DeleteComfirmation
                      closeModal={close}
                      category={"譲渡"}
                      text={`本当に権限を譲渡しますか？`}
                      islandName={`displayData.${table}Name`}
                      table={table}
                      params={displayData.id}
                      user={user.userID}
                    />
                  )}
                  <button onClick={open2} className={styles.exileBtn}>
                    島追放
                  </button>
                  {modal2 && (
                    <DeleteComfirmation
                      closeModal={close2}
                      category={"追放"}
                      text={`本当に追放しますか？`}
                      islandName={`displayData.${table}Name`}
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
              島を抜ける
            </button>
            {modal && (
              <DeleteComfirmation
                closeModal={close}
                category={"脱退する"}
                text={`本当に島を抜けますか？`}
                islandName={`displayData.${table}Name`}
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
