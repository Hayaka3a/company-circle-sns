import { useState } from "react";
import styles from "../../../styles/menubar.module.css";
import { Link, useParams } from "react-router-dom";
import GetCookieID from "../../cookie/getCookieId";
import IslandJoinStatus from "./IslandJoinStatus";
import PartUseEffectIsland from "./partUseEffectIsland";

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

  const setIslandDataReceived = (islandData) => {
    setIsland(islandData);
  };

  return (
    <>
      <PartUseEffectIsland
        paramsID={paramsID}
        onIslandDataFetched={setIslandDataReceived}
      />
      <div className={styles.menubar}>
        {island && (
          <Link to={`/island/${paramsID}`} className={styles.link}>
            <img
              className={styles.icon}
              src={
                island.thumbnail ||
                "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-08T07%3A12%3A33.854Z"
              }
              alt="Event Thumbnail"
            />
          </Link>
        )}

        <IslandJoinStatus
          userID={userID}
          paramsID={paramsID}
          setIsJoined={setIsJoined}
        />

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
              <Link
                to={`/island/eventAll/${paramsID}`}
                className={styles.link2}
              >
                イベント
              </Link>
            </div>
            <div>
              <Link to={`/island/post/${paramsID}`} className={styles.link}>
                ポスト
              </Link>
            </div>
            <div>
              <Link to={`/island/members/${paramsID}`} className={styles.link2}>
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
              <Link
                to={`/island/eventAll/${paramsID}`}
                className={styles.link2}
              >
                イベント
              </Link>
            </div>
            <div>
              <Link to={`/island/members/${paramsID}`} className={styles.link2}>
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
