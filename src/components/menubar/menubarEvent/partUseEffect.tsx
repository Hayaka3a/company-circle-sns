// fetchDataとfetchIslandDataをuseEffectで実行

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchIslandData from "./FetchIslandData";
import FetchData from "./fetchData";
import GetCookieID from "../../cookie/getCookieId";

export default function PartUseEffect() {
  interface Event {
    eventName: string;
    thumbnail: string;
  }

  const [isJoined, setIsJoined] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const params = useParams();
  const paramsID = parseInt(params.id);
  const [eventImage, setEventImage] = useState(
    "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-05T07%3A40%3A07.886Z",
  );
  const userID = GetCookieID();
  const [uniqueEvents, setUniqueEvents] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      const eventData = await FetchIslandData(paramsID);
      if (eventData) {
        setEvent(eventData);
        setEventImage(eventData.thumbnail);
      }
    };

    FetchData(userID, paramsID).then(({ uniqueEvents, isJoined }) => {
      setUniqueEvents(uniqueEvents);
      setIsJoined(isJoined);
    });

    fetchEventData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsID]);

  return { isJoined, event, eventImage, uniqueEvents };
}
