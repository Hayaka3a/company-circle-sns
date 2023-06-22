import styles from "../styles/membersList.module.css";
import { useEffect, useState } from "react";
import { Event, Island, Entryusers, User } from "../types/members";
import { supabase } from "../createClient.js";
import DeleteComfirmation from "./modalWindows/deleteConfirmation";
import GetCookieID from "./cookie/getCookieId";

export default function MembersList({
  table,
  displayData,
  open,
  close,
  modal,
  open2,
  close2,
  modal2,
}: {
  table: string;
  displayData: Island | Event;
  open: () => void;
  close: () => void;
  modal: boolean;
  open2: () => void;
  close2: () => void;
  modal2: boolean;
}) {
  const [entryUsers, setEntryUsers] = useState<Entryusers[]>([]);
  const [newEntryUsers, setNewEntryUsers] = useState<Entryusers[]>([]);
  const [loginUser, setLoginUser] = useState<User>();

  const tmpLoginID = GetCookieID();
  const loginID = Number(tmpLoginID);

  // DBからデータを取得
  useEffect(() => {
    if (!loginUser) {
      fetchData();
    }
  }, [entryUsers, newEntryUsers]);

  async function fetchData() {
    //イベントの場合
    if (table === "event") {
      //イベントに参加しているサークル・難民を取り出す
      const { data, error } = await supabase
        .from("userEntryStatus")
        .select(`*,users(*)`)
        .eq("eventID", displayData.id)
        .eq(`status`, false);
      if (error || !data) {
        console.log(error, "eventFetchError");
      } else {
        //島ID・難民データをそれぞれ配列にしまう
        const tmpArry = data.filter((user) => user.userID) as Entryusers[];
        const islandArry = data
          .filter((ent) => ent.islandID)
          .map((is) => is.islandID);

        //各島のメンバーを取得
        const { data: entryData, error: entryError } = await supabase
          .from("userEntryStatus")
          .select(`*,users(*)`)
          .in("islandID", islandArry)
          .eq(`status`, false);
        if (entryError || !entryData) {
          console.log(entryError, "entryError");
        } else {
          const userData = entryData.filter(
            (user) => user.userID,
          ) as Entryusers[];
          //各島民と難民を一つの配列にしまう
          const conbined = tmpArry.concat(userData);
          const updatedData = conbined.map((item) => {
            if (item.userID === displayData.ownerID) {
              item.users.firstName += "(オーナー)";
            }
            return item;
          });
          setEntryUsers(updatedData);
          getLoginUser();
        }
      }
    } else {
      //島の場合
      //島民全員のデータを取得
      const { data: entryData, error: entryError } = await supabase
        .from("userEntryStatus")
        .select(`*,users(*)`)
        .eq(`${table}ID`, displayData.id)
        .eq(`status`, false);
      if (entryError || !entryData) {
        console.log(entryError, "entryError");
      } else {
        const userData = entryData.filter(
          (user) => user.userID,
        ) as Entryusers[];

        const updatedData = userData.map((item) => {
          if (item.userID === displayData.ownerID) {
            item.users.firstName += "(オーナー)";
          }
          return item;
        });

        setEntryUsers(updatedData);
        getLoginUser();
      }
    }
  }

  //ログインユーザーのデータを取得
  const getLoginUser = async () => {
    //ログインしているユーザーのデータを取得
    const { data: login, error: loginError } = await supabase
      .from("users")
      .select(`*`)
      .eq(`id`, loginID)
      .eq("status", false);

    if (loginError || !login) {
      console.log(loginError, "loginError");
    } else {
      const logData = login[0] as User;
      setLoginUser(logData);

      // ログインユーザーが参加者の場合、ログインユーザーを抜いた配列を新たに作る
      const filteredUsers = entryUsers.filter(
        (user) => user.userID !== loginID && user.userID,
      );
      setNewEntryUsers(filteredUsers.length > 0 ? filteredUsers : []);
    }
  };

  // 自分以外のユーザーの一覧表示
  const anotherUser = (user: Entryusers) => {
    if (loginUser && newEntryUsers) {
      supabase.auth.refreshSession();
      return (
        <td className={styles.td}>
          <img src={user.users.icon} className={styles.icon} alt="アイコン" />
          <div className={styles.name}>
            {user.users.familyName}
            {user.users.firstName}&nbsp;({user.users.department})
          </div>
        </td>
      );
    }
  };

  function buttonSwitching() {
    if (loginUser && displayData.ownerID === loginID) {
      //オーナーの場合のデータ表示
      return (
        <>
          <tr key={loginID} className={styles.tr}>
            <td className={styles.td}>
              <img
                src={loginUser.icon}
                className={styles.icon}
                alt="アイコン"
              />
              <div className={styles.name}>
                {loginUser.familyName}
                {loginUser.firstName}&nbsp;({loginUser.department})(オーナー)
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
              <img
                src={loginUser.icon}
                className={styles.icon}
                alt="アイコン"
              />
              {loginUser.familyName}
              {loginUser.firstName}&nbsp;({loginUser.department})
            </td>
            <td className={styles.td2}>
              <button onClick={open} className={styles.unsubBtn}>
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

  return (
    <div className={styles.main}>
      <h2>{table === "island" ? "島民" : "参加者"}一覧</h2>
      <table className={styles.table}>
        <tbody className={styles.tbody}>{buttonSwitching()}</tbody>
      </table>
    </div>
  );
}
