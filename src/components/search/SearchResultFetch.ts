import { supabase } from "../../createClient";
import { Tags } from "../../types/search";

//島・タグ情報を取得・成形する関数
export const islandFetch = async (setIsland) => {
  const { data: island } = await supabase
    .from("islands")
    .select("id, islandName, thumbnail, detail")
    .eq("status", false);

  const { data: tags } = await supabase
    .from("tagStatus")
    .select("*, tags(*)")
    .eq("status", false);
  const tag = tags as Tags[];

  //島とタグの配列を合併
  const islandWithTag = island.map((islandItem) => {
    const islandID = islandItem.id;
    const matchingTags = tag.filter((tagItem) => tagItem.islandID === islandID);
    return {
      ...islandItem,
      name: islandItem.islandName,
      tags: matchingTags,
      table: "island",
    };
  });

  setIsland(islandWithTag);
};

//イベント情報を取得・成形する関数
export const eventFetch = async (setEve) => {
  const { data: event } = await supabase
    .from("events")
    .select("eventName, thumbnail, detail,id")
    .eq("status", false);

  const compEvent = event.map((eve) => ({
    ...eve,
    name: eve.eventName,
    table: "event",
  }));
  setEve(compEvent);
};

//検索ワードで絞り込む関数
export const filterData = ({ word, radio, islandData, eventData, setCom }) => {
  if (radio === "all") {
    const filteredIslandData = islandData.filter((item) => {
      const { islandName, tags } = item;
      const tagNames = tags.map((tag) => tag.tags.tagName);
      return (
        islandName.includes(word) ||
        tagNames.some((tagName) => tagName.includes(word))
      );
    });
    const filteredEventData = eventData.filter((item) =>
      item.eventName.includes(word),
    );
    const combinedData = [...filteredIslandData, ...filteredEventData];
    setCom(combinedData);
  } else if (radio === "island") {
    const filteredData = islandData.filter((item) => {
      const { islandName, tags } = item;
      const tagNames = tags.map((tag) => tag.tags.tagName);
      const tagNamesKana = tags.map((tag) => tag.tags.tagNameKana);
      return (
        islandName.includes(word) ||
        tagNames.some((tagName) => tagName.includes(word)) ||
        tagNamesKana.some((tagNameKana) => tagNameKana.includes(word))
      );
    });
    setCom(filteredData);
  } else {
    const filteredEventData = eventData.filter((item) =>
      item.eventName.includes(word),
    );
    setCom(filteredEventData);
  }
};
