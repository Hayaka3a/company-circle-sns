import React from "react";
import styles from "../styles/Header.module.css";
import { useNavigate } from "react-router-dom";

import FetchJoindIslandEvent from "./hooks/FetchJoindIslandEvent";

const Header = () => {
  const navigate = useNavigate();

  // 参加してる島、イベントの取得
  const result = FetchJoindIslandEvent();

  // ログアウト処理
  const logOutHandler = () => {
    if (document.cookie !== "") {
      let expirationDate = new Date("1999-12-31T23:59:59Z");
      document.cookie = `id=; expires=${expirationDate.toUTCString()}; path=/;`;
      alert("ログアウトしました");
    }
    navigate("/user/login");
    window.location.reload();
  };
  return (
    <header>
      {/* 検索箇所 */}
      <div>
        <form action="">
          <input type="radio" name="select" id="all" value="all" />
          <label htmlFor="all">すべて検索</label>
          <input type="radio" name="select" id="island" value="island" />
          <label htmlFor="island">島のみ</label>
          <input type="radio" name="select" id="event" value="event" />
          <label htmlFor="event">イベントのみ</label>
          <br />
          <input type="text" maxLength={22} />
          <button>検索</button>
        </form>
      </div>
      {/* ヘッダーの右に位置してるアイテム */}
      <div className={styles.headerItem}>
        <div>
          <img src="" alt="ユーザーアイコン" />
          <span>ユーザー名</span>
        </div>
        <div className={styles.imgWrapper} onClick={logOutHandler}>
          <img
            src="/images/logout.png"
            alt="ログアウト"
            className={styles.logout}
          />
        </div>
        {/* ハンバーガーメニュー */}
        <div className={styles.hambuger}>
          <input className={styles.checkbox} type="checkbox" id="checkbox" />
          <label id="menu01" className={styles.menuTrigger} htmlFor="checkbox">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <nav className={styles.menu}>
            <ul className={styles.menuGroup}>
              <li className={styles.menuGroupItem}>
                <span className={styles.menuGroupItemLink}>参加サークル</span>
                <ul>
                  {result.islands.map((island) => (
                    <div
                      key={island.id}
                      className={styles.listItem}
                      onClick={() => navigate(`/island/${island.id}`)}
                    >
                      <li>{island.islandName}</li>
                    </div>
                  ))}
                </ul>
              </li>
              <li className={styles.menuGroupItem}>
                <span className={styles.menuGroupItemLink}>参加イベント</span>
                <ul>
                  {result.events.map((event) => (
                    <div
                      key={event.id}
                      className={styles.listItem}
                      onClick={() => navigate(`/event/${event.id}`)}
                    >
                      <li>{event.eventName}</li>
                    </div>
                  ))}
                </ul>
              </li>
              <li className={styles.menuGroupItem}>
                <a className={styles.menuGroupItemLink} href="/island/create">
                  新規サークル作成
                </a>
              </li>
              <li className={styles.menuGroupItem}>
                <a className={styles.menuGroupItemLink} href="/user/index">
                  アカウント情報
                </a>
              </li>
              <li className={styles.menuGroupItem}>
                <a className={styles.menuGroupItemLink} href="/user/post">
                  あなたのポスト
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
