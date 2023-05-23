type thread = {
  id: number;
  threadTitle: string;
  events?: {
    id: number;
    eventName: string;
    detail: string;
    thumbnail: string;
    startDate: string;
    endDate: string;
    ownerID: number;
    createdAt: string;
    createdBy: string;
    updatedAt: string | null;
    updatedBy: string | null;
  };
};

export type { thread };
