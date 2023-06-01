export type Tags = {
  id: number;
  tagID: number;
  islandID: number;
  status: boolean;
  tags: {
    id: number;
    tagName: string;
    tagNameKana: string;
    status: boolean;
  };
};

export type IslandSearch = {
  name: string;
  tags: Tags[];
  id: number;
  islandName: string;
  thumbnail: string;
  detail: string;
  table: string;
};

export type EventData = {
  name?: any;
  eventName: any;
  thumbnail: any;
  detail: any;
  table: string;
};

export type ResultState = IslandSearch | EventData;
