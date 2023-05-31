import React, { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import { Island } from "../../types/members";
import { Event } from "../../types/members";

function FetchJoindIslandEvent() {
  const [island, setIsland] = useState([]);
  const [events, setEvents] = useState([]);

  // 仮置き
  const userID = 1;
  useEffect(() => {
    const fetchUserInfo = async () => {
      let tmpIsland = [];
      let tmpEvents = [];
      let { data } = await supabase
        .from("userEntryStatus")
        .select("islands(*), events(*)")
        .eq("userID", userID);

      data.map(
        async (join: { events: Event | null; islands: Island | null }) => {
          if (join.events === null) {
            // 参加サークルのidを取得
            const islandId = join.islands.id;

            // 参加サークルのmessagesを取得
            const { data: post } = await supabase
              .from("posts")
              .select("id, messages(*)")
              .eq("islandID", islandId);

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
          } else if (join.islands === null) {
            // 参加イベントのidを取得
            const eventId = join.events.id;

            // 参加イベントのmessagesを取得
            const { data: post } = await supabase
              .from("posts")
              .select("id, messages(*)")
              .eq("eventID", eventId);
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
          }
        },
      );
      setIsland(tmpIsland);
      setEvents(tmpEvents);
    };
    // fetchUserInfo();
  }, []);

  return { islands: island, events: events };
}

export default FetchJoindIslandEvent;
