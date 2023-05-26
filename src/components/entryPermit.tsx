import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import styles from "../styles/entryPermit.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Message } from "../types/entryPermit";

export default function EntryPermit({ table }: { table: string }) {
  const [message, setMessage] = useState<Message>();

  const params = useParams();
  const paramsID = parseInt(params.id);

  const navi = useNavigate();

  //ひとつ前のページに戻る
  const pageBack = () => {
    navi(-1);
  };

  //  データを取得
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const { data, error } = await supabase
      .from("posts")
      .select(`*,messages(*,applications(*),users(*))`)
      .eq(`${table}ID`, paramsID)
      .eq(`messages.isRead`, false)
      .eq(`messages.isAnswered`, false)
      .eq("status", false);
    if (error) {
      console.log(error, "エラー");
    }

    //applicationsが取得できたものだけで新たな配列を作成
    const selectApp = data[0].messages.filter(
      (message) => message.applications.length > 0,
    );
    setMessage(selectApp);
  }

  //OKボタンの処理
  async function OKButton(messageID: number, userID: number) {
    const { data: updateData, error: updateError } = await supabase
      .from("messages")
      .update({
        isRead: true,
        isAnswered: true,
      })
      .eq(`id`, messageID);
    if (updateError) {
      console.log(updateError, "エラー");
    }

    //島の場合
    if (table === "island") {
      const { data: entryPost, error: entryPostError } = await supabase
        .from("userEntryStatus")
        .insert({ userID: userID, islandID: paramsID, status: false });
      if (entryPostError) {
        console.log(entryPostError, "エラー");
      } else {
        window.location.reload();
      }
    }
    //イベントの場合
    else {
      const { data: entryPost, error: entryPostError } = await supabase
        .from("userEntryStatus")
        .insert({ userID: userID, eventID: paramsID, status: false });
      if (entryPostError) {
        console.log(entryPostError, "エラー");
      } else {
        window.location.reload();
      }
    }
  }

  async function NGButton(messageID: number) {
    const { data: updateData, error: updateError } = await supabase
      .from("messages")
      .update({
        isRead: true,
        isAnswered: true,
      })
      .eq(`id`, messageID);
    if (updateError) {
      console.log(updateError, "エラー");
    } else {
      window.location.reload();
    }
  }

  return (
    <div className={styles.main}>
      <button onClick={pageBack} className={styles.pageBack}>
        ←戻る
      </button>
      <h2 className={styles.title}>許可待ちの住民申請</h2>
      {message && message.length > 0 ? (
        message.map((data) => {
          return (
            <div className={styles.box} key={data.id}>
              <div className={styles.left}>
                <img
                  src={data.users.icon}
                  className={styles.icon}
                  alt="アイコン"
                />
              </div>
              <div className={styles.right}>
                <div className={styles.first}>
                  <p className={styles.name}>
                    {data.users.familyName + data.users.firstName}
                  </p>
                  <div className={styles.button}>
                    <button
                      className={styles.OK}
                      onClick={() => OKButton(data.id, data.postedBy)}
                      key={data.id}
                    >
                      許可
                    </button>
                    <button
                      className={styles.NG}
                      onClick={() => NGButton(data.id)}
                    >
                      却下
                    </button>
                  </div>
                </div>
                <div className={styles.second}>
                  <p>{data.applications[0].message}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>住民申請はありません</p>
      )}
    </div>
  );
}
