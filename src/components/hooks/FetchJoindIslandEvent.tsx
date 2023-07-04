import { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import { Island } from "../../types/members";
import { Event } from "../../types/members";
import GetCookieID from "../cookie/getCookieId";
import SubFetchIsEve from "./SubFetchIsEve";

function FetchJoindIslandEvent() {
  const [island, setIsland] = useState([]);
  const [events, setEvents] = useState([]);
  const [combi, setCombi] = useState([]);

  //ログイン情報取得
  const tmpUserID = GetCookieID();
  const userID = Number(tmpUserID);

  useEffect(() => {
    SubFetchIsEve({ userID, setCombi });
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [combi]);

  const fetchUserInfo = async () => {
    if (combi.length === 0) {
      return;
    } else {
      let tmpIsland = [];
      let tmpEvents = [];

      combi.map(
        async (join: { events: Event | null; islands: Island | null }) => {
          if (join.islands !== null || undefined) {
            // 参加サークルのidを取得
            const islandId = join.islands.id;

            // 参加サークルのmessagesを取得
            const { data: post, error: postError } = await supabase
              .from("posts")
              .select("id, messages!messages_postID_fkey(*)")
              .eq("islandID", islandId)
              .eq("status", false);

            if (postError) {
              console.log(postError, "postError");
            } else if (post.length > 0) {
              // 配列で返ってくるので、index[0]から取り出す
              const msgs = post[0].messages;
              // 未読のメッセージを取得
              const isReadMsg = msgs.filter((msg) => msg.isRead === false);
              // 島名と未読メッセージの数を格納
              const modifiedIsland = {
                id: join.islands.id,
                islandName: join.islands.islandName,
                msgLength: isReadMsg.length,
              };
              // 配列に追加
              tmpIsland.push(modifiedIsland);
            } else {
              return;
            }
          } else if (join.events !== null) {
            // 参加イベントのidを取得
            const eventId = join.events.id;

            // 参加イベントのmessagesを取得
            const { data: post, error: postError } = await supabase
              .from("posts")
              .select("id, messages!messages_postID_fkey(*)")
              .eq("eventID", eventId)
              .eq("status", false);

            if (postError || !post) {
              console.log(postError, "postError");
            } else if (post.length > 0) {
              // 配列で返ってくるので、index[0]から取り出す
              const msgs = post[0].messages;
              // 未読のメッセージを取得
              const isReadMsg = msgs.filter((msg) => msg.isRead === false);
              // 島名と未読メッセージの数を格納
              const modifiedEvent = {
                id: join.events.id,
                eventName: join.events.eventName,
                msgLength: isReadMsg.length,
              };
              // 配列に追加
              tmpEvents.push(modifiedEvent);
            } else {
              return;
            }
          } else {
            return;
          }
        },
      );
      setIsland(tmpIsland);
      setEvents(tmpEvents);
    }
  };
  return { islands: island, events: events };
}

export default FetchJoindIslandEvent;
