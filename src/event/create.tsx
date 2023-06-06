import React, { useEffect, useState } from "react";
import LogSt from "../components/cookie/logSt";
import styles from "../styles/event/create.module.css";
import EventName from "../components/createEvent/eventName";
import { useNavigate, useParams } from "react-router-dom";
import EventDetail from "../components/createEvent/detail";
import Daytime from "../components/createEvent/daytime";
import { supabase } from "../createClient";

export default function EventCreate() {
  LogSt();

  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("/login/loginCounter.png");
  const [eventName, setEventName] = useState("");
  const [detail, setDetail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const params = useParams();
  const paramsID = parseInt(params.id);
  const islandID = params.id;

  console.log(params);

  // CSS部分で画像URLを変更（imgタグ以外で挿入すれば、円形にしても画像が収縮表示されない）
  useEffect(() => {
    let circleElement = document.getElementById("img");
    if (circleElement) {
      circleElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  }, [imageUrl]);

  // 画像ファイル選択したら、表示画像に反映
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };
  // イベント作成する
  const createHandler = async () => {
    const eventData = {
      eventName: eventName,
      detail: detail,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      status: "false",
      createdBy: "システム",
    };

    try {
      await supabase.from("events").insert(eventData);

      // 作成されたイベントのIDを取得
      const { data } = await supabase
        .from("events")
        .select("id")
        .eq("eventName", eventName);
      const createdEventId = data[0].id;

      // userEntryStatusテーブルに挿入
      try {
        const enStatusData = {
          islandID: islandID,
          eventID: createdEventId,
          status: "false",
        };
        await supabase.from("userEntryStatus").insert(enStatusData);

        // postテーブルに島用ポスト作成
        try {
          const post = {
            eventID: createdEventId,
            status: "false",
          };
          await supabase.from("posts").insert(post);
        } catch (error) {
          console.log("イベントポスト作成エラー");
        }
      } catch (error) {
        console.log("userEntryStatus挿入エラー");
      }

      navigate(`/event/${paramsID}`);
      window.location.reload();
    } catch (error) {
      console.log("イベント作成エラー");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.box}>
        <div className={styles.allContents}>
          <h1>新規イベント作成</h1>
          <div className={styles.tableCovered}>
            <table>
              <tbody>
                <tr>
                  <th>
                    イベント名<span className={styles.span}>【必須】</span>
                  </th>
                  <td>
                    <EventName
                      eventName={eventName}
                      setEventName={setEventName}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    詳細<span className={styles.span}>【必須】</span>
                  </th>
                  <td>
                    <EventDetail detail={detail} setDetail={setDetail} />
                  </td>
                </tr>
                <tr>
                  <th>
                    開催期間<span className={styles.span}>【必須】</span>
                  </th>
                  <td>
                    <Daytime
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                    />
                  </td>
                </tr>
                <tr>
                  <th>サムネイル</th>
                  <td className={styles.imgSide}>
                    <p className={styles.icon} id="img"></p>
                    <div className={styles.faileCenter}>
                      <input
                        type="file"
                        id="thumbnail"
                        className={styles.inputA}
                        onChange={handleFileChange}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            onClick={createHandler}
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
    </div>
  );
}
