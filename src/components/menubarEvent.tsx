import React, { useEffect, useState } from "react";
import styles from "../styles/menubar.module.css";
import { Link, useParams } from "react-router-dom";
import GetCookieID from "./cookie/getCookieId";
import { supabase } from "../createClient";

export default function MenubarEvent({ thumbnail }: { thumbnail: string }) {
  const [isJoined, setIsJoined] = useState(false); // イベントに参加しているかどうかの状態
  const params = useParams();
  const paramsID = parseInt(params.id);
  console.log(paramsID);

  // 画像URL変更
  useEffect(() => {
    let imageUrl = thumbnail;
    let circleElement = document.getElementById("img");

    if (circleElement) {
      circleElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  }, []);

  const userID = GetCookieID();
  const eventID = paramsID.toString();

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("userEntryStatus")
      .select("*")
      .eq("userID", userID)
      .eq("eventID", eventID)
      .eq("status", "false");
    if (error) {
      console.log(error);
      // ユーザーがイベントに参加してるとき
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
        <h4>イベント名</h4>
        {/* ユーザーがイベントに参加している場合 */}
        {isJoined && (
          <div className={styles.menuContents}>
            <div>
              <Link to={`/event/thread/${paramsID}`}>掲示板</Link>
            </div>
            <div>
              <Link to={`/event/post/${paramsID}`}>ポスト</Link>
            </div>
            <div>
              <Link to={`/event/members/${paramsID}`}>参加者一覧</Link>
            </div>
            <div>
              <Link to={`/event/${paramsID}`}>イベント詳細</Link>
            </div>
          </div>
        )}
        {/* ユーザーがイベントに参加してないとき */}
        {!isJoined && (
          <div className={styles.menuContents}>
            <div>
              <Link to={`/event/members`}>参加者一覧</Link>
            </div>
            <div>
              <Link to={`/event/[id]`}>イベント詳細</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
