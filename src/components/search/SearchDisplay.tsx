import { useEffect, useState } from "react";
import {
  eventFetch,
  filterData,
  islandFetch,
} from "../search/SearchResultFetch";
import styles from "../../styles/search.module.css";
import { Link } from "react-router-dom";
import { EventData, IslandSearch, ResultState } from "../../types/search";

export default function SearchDisplay({ word, radio }) {
  const [islandData, setIslandData] = useState<IslandSearch[]>([]);
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [completion, setCompletion] = useState([]);

  //データ取得時に使用するstate
  const setIsland = (data: IslandSearch[]) => {
    setIslandData(data);
  };
  const setEve = (data: EventData[]) => {
    setEventData(data);
  };
  const setCom = (data: ResultState[]) => {
    setCompletion(data);
  };

  useEffect(() => {
    fetchData();
  }, [word, radio]);

  const fetchData = async () => {
    //ラジオボタンに応じてデータを取得
    if (radio === "all") {
      await Promise.all([islandFetch(setIsland), eventFetch(setEve)]);
    } else if (radio === "island") {
      await islandFetch(setIsland);
    } else {
      await eventFetch(setEve);
    }
  };
  useEffect(() => {
    filterData({
      word,
      radio,
      islandData,
      eventData,
      setCom,
    });
    console.log(eventData, "こむ");
  }, [word, radio, islandData, eventData]);

  return (
    <div>
      {completion && completion.length === 0 ? (
        <p>検索結果は0件です</p>
      ) : (
        completion.map((searchData) => {
          return (
            <div className={styles.result} key={searchData.id}>
              <img
                src={searchData.thumbnail}
                className={styles.icon}
                alt="アイコン"
              />
              <div className={styles.left}>
                <div className={styles.title}>
                  {searchData.table === "island" ? (
                    <div className={styles.typeIs}>{searchData.table}</div>
                  ) : (
                    <div className={styles.typeEve}>{searchData.table}</div>
                  )}

                  <Link to={`/${searchData.table}/${searchData.id}`}>
                    {searchData.name}
                  </Link>
                </div>
                <p className={styles.detail}>{searchData.detail}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
