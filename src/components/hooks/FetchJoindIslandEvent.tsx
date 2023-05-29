import React, { useEffect, useState } from "react";
import { supabase } from "../../createClient";

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
      data.map((join) => {
        if (join.events === null) {
          tmpIsland.push(join.islands);
        } else if (join.islands === null) {
          tmpEvents.push(join.events);
        }
      });
      setIsland(tmpIsland);
      setEvents(tmpEvents);
    };
    fetchUserInfo();
  }, []);
  return { islands: island, events: events };
}

export default FetchJoindIslandEvent;
