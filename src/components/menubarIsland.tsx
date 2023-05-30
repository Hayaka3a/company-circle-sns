import React, { useEffect, useState } from "react";
import styles from "../styles/menubar.module.css";
import { Link, useParams } from "react-router-dom";
import GetCookieID from "./cookie/getCookieId";
import { supabase } from "../createClient";

export default function MenubarIsland({
  thumbnail,
}: {
  thumbnail: string | null;
}) {
  const [isJoined, setIsJoined] = useState(false); // サークルに参加しているかどうかの状態
  const params = useParams();
  const paramsID = parseInt(params.id);

  // 画像URL変更
  useEffect(() => {
    let imageUrl = thumbnail;
    let circleElement = document.getElementById("img");

    if (circleElement) {
      circleElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  }, []);

  const userID = GetCookieID();
  const islandID = paramsID.toString();

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("userEntryStatus")
      .select("*")
      .eq("userID", userID)
      .eq("islandID", islandID)
      .eq("status", "false");
    if (error) {
      console.log(error);
      // ユーザーがサークルに参加してるとき
    } else if (data && data.length > 0) {
      setIsJoined(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.menubar}>
        <div className={styles.icon} id="img"></div>
        <h4>島名</h4>
        {/* ユーザーがサークルに参加している場合 */}
        {isJoined && (
          <div className={styles.menuContents}>
            <div>
              <Link to={`/island/thread/${paramsID}`}>掲示板</Link>
            </div>
            <div>
              <Link to={`/event/${paramsID}`}>イベント</Link>
            </div>
            <div>
              <Link to={`/island/post/${paramsID}`}>ポスト</Link>
            </div>
            <div>
              <Link to={`/island/members/${paramsID}`}>島民一覧</Link>
            </div>
            <div>
              <Link to={`/island/${paramsID}`}>島詳細</Link>
            </div>
          </div>
        )}
        {/* ユーザーがサークルに参加していない場合 */}
        {!isJoined && (
          <div className={styles.menuContents}>
            <div>
              <Link to={`/event/[id]`}>イベント</Link>
            </div>
            <div>
              <Link to={`/island/members`}>島民一覧</Link>
            </div>
            <div>
              <Link to={`/island/[id]`}>島詳細</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
