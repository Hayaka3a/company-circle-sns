import { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import styles from "../../styles/entryPermit.module.css";
import { useParams } from "react-router-dom";
import { Message } from "../../types/entryPermit";

export default function EntryPermit({ table }: { table: string }) {
  const [message, setMessage] = useState<Message>();

  const params = useParams();
  const paramsID = parseInt(params.id);

  //  データを取得
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const { data, error } = await supabase
      .from("posts")
      .select(`*,messages(*,applications(*),users(*))`)
      .eq(`${table}ID`, paramsID)
      .eq("status", false);
    if (error) {
      console.log(error);
    }

    //applicationsが取得できたものだけで新たな配列を作成
    const selectApp = data[0].messages.filter(
      (message) => message.applications.length > 0,
    );
    setMessage(selectApp);
  }

  return (
    <div className={styles.main}>
      <h2>許可待ちの住民申請</h2>
      {message &&
        message.map((message) => {
          return (
            <div className={styles.box} key={message.id}>
              <div className={styles.left}>
                <img
                  src={message.users.icon}
                  className={styles.icon}
                  alt="アイコン"
                />
              </div>
              <div className={styles.right}>
                <div className={styles.first}>
                  <p className={styles.name}>
                    {message.users.familyName + message.users.firstName}
                  </p>
                  <div className={styles.button}>
                    <button className={styles.OK}>許可</button>
                    <button className={styles.NG}>却下</button>
                  </div>
                </div>
                <div className={styles.second}>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
