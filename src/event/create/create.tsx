import React, { useState } from "react";
import LogSt from "../../components/cookie/logSt";
import styles from "../../styles/event/create.module.css";
import EventName from "../../components/createEvent/eventName/eventName";
import { useNavigate, useParams } from "react-router-dom";
import EventDetail from "../../components/createEvent/detail/detail";
import Daytime from "../../components/createEvent/daytime/daytime";
import SelectIsland from "../../components/selectIsland";
import MenubarIsland from "../../components/menubar/menubarIsland/menubarIsland";
import HandleFileChange from "./handleFileChange";
import { useCreateEventHandler } from "./createHandler";

export default function EventCreate() {
  LogSt();

  const [nameAlreadyError, setNameAlreadyError] = useState("");
  const params = useParams();
  const islandID = params.id;

  const {
    imageUrl,
    setImageUrl,
    eventName,
    setEventName,
    detail,
    setDetail,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    islandTags,
    setIslandTags,
    createHandler,
  } = useCreateEventHandler();

  return (
    <div className={styles.all}>
      <MenubarIsland />
      <div className={styles.box}>
        <h2>新しいイベントを作成</h2>
        <div className={styles.tableCovered}>
          <table className={styles.table}>
            <tbody className={styles.tbody}>
              <tr className={styles.tr}>
                <th className={styles.th}>
                  イベント名<span className={styles.span}>【必須】</span>
                </th>
                <td className={styles.td}>
                  <EventName
                    eventName={eventName}
                    setName={setEventName}
                    nameAlreadyError={nameAlreadyError}
                    setNameAlreadyError={setNameAlreadyError}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>
                  詳細<span className={styles.span}>【必須】</span>
                </th>
                <td className={styles.td}>
                  <EventDetail detail={detail} setDetail={setDetail} />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>
                  開催期間<span className={styles.span}>【必須】</span>
                </th>
                <td className={styles.td}>
                  <Daytime
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>サムネイル</th>
                <td className={styles.imgSide}>
                  <div className={styles.imgCenter}>
                    <img
                      className={styles.icon}
                      src={imageUrl || "/event/event_icon.png"}
                      alt="Event Thumbnail"
                    />
                  </div>
                  <div className={styles.fileCenter}>
                    <label className={styles.fileLabel}>
                      <input
                        type="file"
                        id="thumbnail"
                        className={styles.file}
                        onChange={(event) => {
                          HandleFileChange(event, setImageUrl);
                        }}
                      />
                      ファイルを選択
                    </label>
                  </div>
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>共同開催島</th>
                <td className={styles.td}>
                  <SelectIsland
                    islandID={islandID}
                    setIslandTags={setIslandTags}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          onClick={createHandler}
          className={styles.btn}
          disabled={
            !eventName.trim() ||
            !detail.trim() ||
            !startDate.trim() ||
            !endDate.trim() ||
            !!nameAlreadyError
          }
        >
          新しいイベントを開催する
        </button>
      </div>
    </div>
  );
}
