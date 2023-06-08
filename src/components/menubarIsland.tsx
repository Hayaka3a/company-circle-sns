import React, { useEffect, useState } from "react";
import styles from "../styles/menubar.module.css";
import { Link, useParams } from "react-router-dom";
import GetCookieID from "./cookie/getCookieId";
import { supabase } from "../createClient";

export default function MenubarIsland() {
  interface Island {
    islandName: string;
    thumbnail: string;
  }
  const [isJoined, setIsJoined] = useState(false); // サークルに参加しているかどうかの状態
  const [island, setIsland] = useState<Island | null>(null);
  const params = useParams();
  const paramsID = parseInt(params.id);

  const userID = GetCookieID();

  // 表示している島の情報をislandに挿入
  const fetchIslandData = async () => {
    const { data, error } = await supabase
      .from("islands")
      .select("islandName, thumbnail")
      .eq("id", paramsID)
      .eq("status", false);

    if (error) {
      console.error("islandsテーブルデータ情報取得失敗", error);
      return;
    }

    if (data && data.length > 0) {
      setIsland(data[0]);
    }
  };

  // ユーザーが表示している島に参加しているかどうかチェック
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("userEntryStatus")
      .select("*")
      .eq("userID", userID)
      .eq("islandID", paramsID)
      .eq("status", false);
    if (error) {
      console.log(error);
      // ユーザーがサークルに参加してるとき
    } else if (data && data.length > 0) {
      setIsJoined(true);
    }
  };

  useEffect(() => {
    fetchData();
    fetchIslandData();
  }, []);

  return (
    <>
      <div className={styles.menubar}>
        {island && (
          <img
            className={styles.icon}
            src={island.thumbnail || "/island/island_icon.png"}
            alt="Event Thumbnail"
          />
        )}

        {/* 非同期関数で取得しているから、islandデータが取得される前にコンポーネント描画されて、islandデータが
        nullで返ってきちゃうから */}
        <h3 className={styles.title}>{island && island.islandName}島</h3>

        {/* ユーザーがサークルに参加している場合 */}
        {isJoined && (
          <div className={styles.menuContents}>
            <div>
              <Link to={`/island/thread/${paramsID}`} className={styles.link}>
                掲示板
              </Link>
            </div>
            <div>
              <Link to={`/island/eventAll/${paramsID}`} className={styles.link}>
                イベント
              </Link>
            </div>
            <div>
              <Link to={`/island/post/${paramsID}`} className={styles.link}>
                ポスト
              </Link>
            </div>
            <div>
              <Link to={`/island/members/${paramsID}`} className={styles.link}>
                島民一覧
              </Link>
            </div>
            <div>
              <Link to={`/island/${paramsID}`} className={styles.link}>
                島詳細
              </Link>
            </div>
          </div>
        )}
        {/* ユーザーがサークルに参加していない場合 */}
        {!isJoined && (
          <div className={styles.menuContents}>
            <div>
              <Link to={`/island/eventAll/${paramsID}`} className={styles.link}>
                イベント
              </Link>
            </div>
            <div>
              <Link to={`/island/members/${paramsID}`} className={styles.link}>
                島民一覧
              </Link>
            </div>
            <div>
              <Link to={`/island/${paramsID}`} className={styles.link}>
                島詳細
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
