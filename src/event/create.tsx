import React, { useState } from "react";
import LogSt from "../components/cookie/logSt";
import styles from "../styles/event/create.module.css";
import EventName from "../components/createEvent/eventName/eventName";
import { useNavigate, useParams } from "react-router-dom";
import EventDetail from "../components/createEvent/detail/detail";
import Daytime from "../components/createEvent/daytime/daytime";
import { supabase } from "../createClient";
import SelectIsland from "../components/selectIsland";
import MenubarIsland from "../components/menubar/menubarIsland";
import GetCookieID from "../components/cookie/getCookieId";

export default function EventCreate() {
  LogSt();

  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [eventName, setEventName] = useState("");
  const [detail, setDetail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [islandTags, setIslandTags] = useState<
    { id: number; islandName: string }[]
  >([]);

  const params = useParams();
  const islandID = params.id;

  // 画像ファイル選択したら、表示画像に反映
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      // 画像が選択されていないのでreturn
      return;
    }

    const file = event.target.files?.[0];
    const random = Math.floor(Math.random() * 10000);
    const filePath = `${file.name}${random}`; // 画像の保存先のpathを指定
    const { error } = await supabase.storage
      .from("eventIcon")
      .upload(filePath, file);
    if (error) {
      console.log(error, "画像追加エラー", filePath);
    }

    const { data } = supabase.storage.from("eventIcon").getPublicUrl(filePath);
    setImageUrl(data.publicUrl);
  };

  // イベント作成する
  const createHandler = async () => {
    const { data: island, error: islandError } = await supabase
      .from("islands")
      .select("ownerID")
      .eq("id", Number(islandID));

    if (islandError) {
      console.error("見つかりません");
    }

    const eventData = {
      eventName: eventName,
      detail: detail,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      ownerID: island[0].ownerID,
      status: false,
      createdBy: "システム",
      thumbnail: imageUrl,
    };

    try {
      await supabase.from("events").insert(eventData);

      // 作成されたイベントのIDを取得
      const { data } = await supabase
        .from("events")
        .select("id")
        .eq("eventName", eventName)
        .eq("status", false);
      const createdEventId = data[0].id;

      // userEntryStatusテーブルに挿入
      try {
        const enStatusData = {
          islandID: islandID,
          eventID: createdEventId,
          status: false,
        };
        await supabase.from("userEntryStatus").insert(enStatusData);

        // postテーブルに島用ポスト作成
        try {
          const post = {
            eventID: createdEventId,
            status: false,
          };
          await supabase.from("posts").insert(post);

          // 共同開催島がある場合、userEntryStatusテーブルに追加
          if (islandTags) {
            islandTags.map(async (island) => {
              const islandEvent = {
                islandID: island.id,
                eventID: createdEventId,
                status: "false",
              };
              const { error: islandEventError } = await supabase
                .from("userEntryStatus")
                .insert(islandEvent);

              if (islandEventError) {
                console.error("共同開催島情報追加失敗");
              }
            });
            navigate(`/event/${createdEventId}`);
            window.location.reload();
          }
        } catch (error) {
          console.log("イベントポスト作成エラー");
        }
      } catch (error) {
        console.log("userEntryStatus挿入エラー");
      }
    } catch (error) {
      console.log("イベント作成エラー");
    }
  };

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
                    setEventName={setEventName}
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
                        onChange={handleFileChange}
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
            !endDate.trim()
          }
        >
          新しいイベントを開催する
        </button>
      </div>
    </div>
  );
}
