import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../createClient";

export function useCreateEventHandler() {
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

  return {
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
  };
}
