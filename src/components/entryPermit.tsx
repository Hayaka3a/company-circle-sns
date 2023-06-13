import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import styles from "../styles/entryPermit.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Message } from "../types/entryPermit";

export default function EntryPermit({ table }: { table: string }) {
  const [message, setMessage] = useState<Message>();
  const [user, setUser] = useState([]);

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

  useEffect(() => {
    getUsers(message);
  }, [message]);

  async function fetchData() {
    const { data, error } = await supabase
      .from("posts")
      .select(`*,messages!messages_postID_fkey(*,applications(*))`)
      .eq(`${table}ID`, paramsID)
      .eq("status", false);
    if (error) {
      console.log(error, "エラー");
    }
    if (!data || data.length === 0) {
      console.log("ポストまたはメッセージがみつかりませんでした");
    } else {
      console.log(data);
      //applicationsが取得できたものだけで新たな配列を作成
      const selectApp = data[0].messages.filter(
        (message) => message.applications.length > 0 && !message.isAnswered,
      );
      setMessage(selectApp);
    }
  }

  //messageを送ったユーザーを取得
  const getUsers = async (data: any[]) => {
    if (data) {
      let promises = data.map(async (message) => {
        const { data: userData, error: userError } = await supabase
          .from("posts")
          .select("*,users!posts_userID_fkey(*)")
          .eq("id", message.postedBy);

        if (userError) {
          console.log(userError, "ユーザー取得エラー");
        }

        let arr = { ...message, users: userData[0].users };

        return arr;
      });
      // Promise.all でまとめて待つ
      let ret = await Promise.all(promises);

      setUser(ret);
      return ret;
    }
  };

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
        // 難民のeventIDを取得
        const { data: existingEntryStatus, error: existingEntryStatusError } =
          await supabase
            .from("userEntryStatus")
            .select("id, eventID")
            .eq("userID", userID)
            .eq("status", false);

        // 島の開催イベントIDを取得
        const { data: islandEvent, error: islandEventError } = await supabase
          .from("userEntryStatus")
          .select("id, eventID")
          .eq("islandID", paramsID)
          .eq("status", false);

        for (const existingEntry of existingEntryStatus) {
          const matchingEntry = islandEvent.find(
            (event) => event.eventID === existingEntry.eventID,
          );

          if (matchingEntry && matchingEntry.eventID !== null) {
            const { id } = existingEntry;

            // existingEntryデータのidごとにデータを更新
            await supabase
              .from("userEntryStatus")
              .update({ status: true })
              .eq("id", id);
          }
        }

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
      <div className={styles.content}>
        <h2 className={styles.title}>許可待ちの住民申請</h2>
        {user && user.length > 0 ? (
          user.map((data) => {
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
    </div>
  );
}
