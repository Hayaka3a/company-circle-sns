import { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import styles from "../../styles/entryPermit.module.css";
import { useParams } from "react-router-dom";
import { Message } from "../../types/entryPermit";

export default function EntryPermit({ table }: { table: string }) {
  const [message, setMessage] = useState();

  const params = useParams();
  const paramsID = parseInt(params.id);

  //  データを取得
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const { data, error } = await supabase
      .from("posts")
      .select(`*,messages(*,applications(*))`)
      .eq(`${table}ID`, paramsID);

    // const selectApp = data[0].filter((application) => applications.id === true);
    console.log(data, "あ");
    setMessage(data[0].messages);
  }
  console.log(message);
  const entryDesired = [
    {
      id: 1,
      famiryName: "田中",
      firstName: "太郎",
      icon: "a",
      message:
        "これは住民申請用の５０文字の文章ですテキストテキストテキストテキストテキストテキストテキストテキスト",
    },
    {
      id: 2,
      famiryName: "田無川",
      firstName: "一",
      icon: "a",
      message: "aaaaa",
    },
  ];

  return (
    <div className={styles.main}>
      <h2>許可待ちの住民申請</h2>
      {entryDesired.map((message) => {
        return (
          <div className={styles.box} key={message.id}>
            <div className={styles.left}>
              <img src={message.icon} className={styles.icon} alt="アイコン" />
            </div>
            <div className={styles.right}>
              <div className={styles.first}>
                <p className={styles.name}>
                  {message.famiryName + message.firstName}
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
