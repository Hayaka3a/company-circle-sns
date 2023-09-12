import { useEffect } from "react";
import FetchIslandData from "./fetchIslandData";

export default function PartUseEffectIsland({ paramsID, onIslandDataFetched }) {
  useEffect(() => {
    const fetchIslandDataWithParamsID = async () => {
      const islandData = await FetchIslandData(paramsID);
      onIslandDataFetched(islandData);
    };
    fetchIslandDataWithParamsID();
  }, [paramsID, onIslandDataFetched]);

  return null;
}
