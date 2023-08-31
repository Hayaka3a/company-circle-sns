import { useEffect, useState } from "react";
import styles from "../../styles/entryPermit.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Message } from "../../types/entryPermit";
import { fetchData } from "./fetchData";
import { getUsers } from "./getUsers";
import { OKButton } from "./OKButton";
import { NGButton } from "./NGButton";

export default function EntryPermit({ table }: { table: string }) {
  const [message, setMessage] = useState<Message>();
  const [user, setUser] = useState([]);
  const params = useParams();
  const paramsID = parseInt(params.id);

  //ひとつ前のページに戻る
  const navi = useNavigate();
  const pageBack = () => {
    navi(-1);
  };

  //  ポストに届いている参加申請を取得
  useEffect(() => {
    fetchData({ table: table, paramsID: paramsID, setMessage: setMessage });
  }, []);

  //参加申請を送ってきたユーザーの情報を取得
  useEffect(() => {
    getUsers({ message, setUser });
  }, [message]);

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
                        onClick={() => {
                          OKButton(data.id, data.users.id, table, paramsID);
                        }}
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
