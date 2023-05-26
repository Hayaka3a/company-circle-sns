export type Message = {
  id: number;
  message: string;
  postedBy: number;
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
  users: { id: number; icon: string; familyName: string; firstName: string };
}[];
