import styles from "../../styles/membersList.module.css";
import { useEffect, useState } from "react";
import { Event, Island, Entryusers } from "../../types/members";
import { supabase } from "../../createClient.js";

export default function MembersList({
  table,
  displayData,
}: {
  table: string;
  displayData: Island | Event;
}) {
  const [entryUsers, setEntryUsers] = useState<Entryusers[]>();
  const [newEntryUsers, setNewEntryUsers] = useState<Entryusers[]>();

  //仮置きのデータ
  const loginUser = {
    id: 1,
    familyName: "山田",
    firstName: "一郎",
    icon: "/image1",
  };

  // DBからデータを取得
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    //参加者全員のデータを取得
    const { data: entryData, error: entryError } = await supabase
      .from("userEntryStatus")
      .select(`*,users(*)`)
      .eq(`${table}ID`, displayData.id);
    if (!entryData) return;
    if (entryError) {
      console.log(entryError);
    }

    const userData = entryData as Entryusers[];
    setEntryUsers(userData);

    // ログインユーザーが参加者の場合、ログインユーザーを抜いた配列を新たに作る
    const filteredUsers = userData.filter(
      (user) => user.users.id !== loginUser.id,
    );
    setNewEntryUsers(filteredUsers.length > 0 ? filteredUsers : []);
  }

  // 自分以外のユーザーの一覧表示
  const anotherUser = (user: Entryusers) => {
    if (anotherUser === undefined) {
      return;
    } else {
      return (
        <td className={styles.td}>
          <img src={user.users.icon} className={styles.icon} alt="アイコン" />
          {user.users.familyName}
          {user.users.firstName}
        </td>
      );
    }
  };

  function buttonSwitching() {
    if (displayData.ownerID === loginUser.id) {
      //オーナーの場合のデータ表示
      return (
        <>
          <tr key={loginUser.id} className={styles.tr}>
            <td className={styles.td}>
              <img
                src={loginUser.icon}
                className={styles.icon}
                alt="アイコン"
              />
              {loginUser.familyName}
              {loginUser.firstName}
              (オーナー)
            </td>
            <td className={styles.td}></td>
          </tr>
          {newEntryUsers?.map((user) => {
            return (
              <tr key={user.id} className={styles.tr}>
                {anotherUser(user)}
                <td className={styles.td}>
                  <button>島主権限を譲渡</button>
                  <button>島追放</button>
                </td>
              </tr>
            );
          })}
        </>
      );
    } else if (entryUsers?.some((user) => user.users.id === loginUser.id)) {
      return (
        <>
          <tr key={loginUser.id} className={styles.tr}>
            <td className={styles.td}>
              <img
                src={loginUser.icon}
                className={styles.icon}
                alt="アイコン"
              />
              {loginUser.familyName}
              {loginUser.firstName}
            </td>
            <td className={styles.td}>
              <button>島を抜ける</button>
            </td>
          </tr>
          {newEntryUsers?.map((user) => {
            return (
              <tr key={user.id}>
                {anotherUser(user)}
                <td className={styles.td}></td>
              </tr>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {entryUsers?.map((user) => {
            return (
              <tr key={user.id} className={styles.tr}>
                {anotherUser(user)}
                <td className={styles.td}></td>
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
