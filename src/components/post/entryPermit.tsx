import { supabase } from "../../createClient";
import styles from "../../styles/entryPermit.module.css";

export default function EntryPermit() {
  //  データを取得
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
          <div className={styles.box}>
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
