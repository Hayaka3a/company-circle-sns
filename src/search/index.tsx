import SearchDisplay from "../components/search/SearchDisplay";
import styles from "../styles/search.module.css";
import { useLocation } from "react-router-dom";

import LogSt from "../components/cookie/logSt";
export default function Search() {
  //ヘッダーから検索ワードとラジオボタンの選択を受け取る
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const word = queryParams.get("word");
  const radio = queryParams.get("radio");

  LogSt();

  return (
    <div className={styles.display}>
      <div className={styles.main}>
        <div className={styles.upper}>
          <p className={styles.word}>"{word}"の検索結果</p>
        </div>
        <SearchDisplay word={word} radio={radio} />
      </div>
    </div>
  );
}
