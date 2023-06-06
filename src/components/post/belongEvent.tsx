import { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import GetCookieID from "../cookie/getCookieId";

export default function BelongEvent() {
  const userID = GetCookieID();
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: entrys, error: entrysError } = await supabase
          .from("userEntryStatus")
          .select("islandID")
          .eq("userID", userID);

        // entrys配列の中からeventIDがnullの値のものを配列から取り除く
        const ens = entrys.filter((event) => event.islandID !== null);

        if (entrysError) {
          console.error("データ1取得失敗", entrysError.message);
          return;
        }
        try {
          const filteredEvents = await Promise.all(
            ens.map(async (en) => {
              const { data: events, error: eventsError } = await supabase
                .from("userEntryStatus")
                .select("eventID")
                .eq("islandID", en.islandID);

              if (eventsError) {
                console.error("データ1取得失敗", eventsError.message);
                return;
              }

              // events配列の中からeventIDがnullの値のものを配列から取り除く
              const filteredEvents = events.filter(
                (event) => event.eventID !== null,
              );

              return filteredEvents;
            }),
          );

          // 配列の配列になっているのをフラット化する（ただの配列に直す）
          const flattenedEvents = filteredEvents.flat();

          // 同じeventIDを持つデータを1つにまとめる
          const uniqueEvents = flattenedEvents.reduce((acc, event) => {
            if (!acc.some((e) => e.eventID === event.eventID)) {
              acc.push(event);
            }
            return acc;
          }, []);

          const { data: refugee, error: refugeeError } = await supabase
            .from("userEntryStatus")
            .select("eventID")
            .eq("userID", userID);

          if (refugeeError) {
            console.error("データ取得失敗", refugeeError.message);
            return;
          }

          const uniqueEventsFiltered = refugee.filter(
            (evt) => evt.eventID !== null,
          );

          uniqueEvents.push(...uniqueEventsFiltered);

          await Promise.all(
            uniqueEvents.map(async (event) => {
              const { data: posts } = await supabase
                .from("posts")
                .select("id")
                .eq("eventID", event.eventID);

              try {
                await Promise.all(
                  posts.map(async (post) => {
                    const { data: messages, error: messagesError } =
                      await supabase
                        .from("messages")
                        .select("*")
                        .eq("postID", post.id)
                        .eq("isRead", "false");

                    if (messagesError) {
                      console.error("データ1取得失敗", messagesError.message);
                      return;
                    }

                    if (messages[0]) {
                      setHasNewMessage(true);
                    } else {
                      console.log("メッセージはありません");
                    }
                  }),
                );
              } catch (error) {
                console.error("messages失敗");
              }
            }),
          );
        } catch (error) {
          console.error("try2失敗");
        }
      } catch (error) {
        console.error("メッセージ情報取得失敗", error.message);
      }
    };

    fetchData();
  }, [userID, setHasNewMessage]);
  return (
    <>
      {hasNewMessage && <p>✴イベントポストに新しいメッセージが届いています</p>}
    </>
  );
}
