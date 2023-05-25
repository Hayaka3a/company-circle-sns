export type Message = {
  id: number;
  message: string;
  postedBy: string;
  postID: string;
  scout: boolean;
  isRead: boolean;
  isAnswered: boolean;
  status: boolean;
  applications: {
    id: number;
    message: string;
    messageID: number;
    status: boolean;
  }[];
};
