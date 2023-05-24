import styles from "../../styles/membersList.module.css";
import { useEffect, useState } from "react";
import { Event, Island, Entryusers } from "../../types/members";
import { supabase } from "../../createClient.js";
import ExileButton from "./ExileButton";
import OwnerTransferButton from "./OwnerTransferButton";
import LeaveButton from "./LeaveButton";

export default function MembersList({
  table,
  displayData,
}: {
  table: string;
  displayData: Island | Event;
}) {
  const [entryUsers, setEntryUsers] = useState<Entryusers[]>();
  const [newEntryUsers, setNewEntryUsers] = useState<Entryusers[]>();
  const [reload, setReload] = useState(false);

  //仮置きのデータ
  const loginUser = {
    id: 1,
    familyName: "山田",
    firstName: "一郎",
    icon: "/image1",
  };

  //画面更新用関数
  const handleRefresh = () => {
    setReload(true);
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
      .eq(`${table}ID`, displayData.id)
      .eq(`status`, false);
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
                  <OwnerTransferButton
                    text={"島主権限を譲渡"}
                    table={table}
                    params={displayData.id}
                    user={user.users.id}
                    onclick={handleRefresh}
                  />
                  <ExileButton
                    text={"島を追放"}
                    table={table}
                    params={displayData.id}
                    user={user.users.id}
                  />
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
              <LeaveButton
                text={"島を抜ける"}
                table={table}
                params={displayData.id}
                user={loginUser.id}
              />
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
