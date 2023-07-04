import styles from "../../styles/membersList.module.css";
import { useEffect, useState } from "react";
import { Event, Island, Entryusers, User } from "../../types/members";
import { supabase } from "../../createClient.js";
import GetCookieID from "../cookie/getCookieId";
import { fetchMembers } from "./fetchMembers";
import { ButtonSwitching } from "./ButtonSwiching";

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
      fetchMembers({
        table,
        displayData,
        setEntryUsers,
        loginID,
        setLoginUser,
        entryUsers,
        setNewEntryUsers,
      });
    }
  }, [entryUsers, newEntryUsers]);

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

  return (
    <div className={styles.main}>
      <h2>{table === "island" ? "島民" : "参加者"}一覧</h2>
      <table className={styles.table}>
        <tbody className={styles.tbody}>
          <ButtonSwitching
            loginUser={loginUser}
            displayData={displayData}
            loginID={loginID}
            newEntryUsers={newEntryUsers}
            anotherUser={anotherUser}
            open={open}
            modal={modal}
            table={table}
            open2={open2}
            modal2={modal2}
            close2={close2}
            entryUsers={entryUsers}
            close={close}
          />
        </tbody>
      </table>
    </div>
  );
}
