export type User = {
  id: number;
  familyName: string;
  firstName: string;
  familyNameKana: string;
  firstNameKana: string;
  mailAddress: string;
  password: string;
  icon: string | null;
  employeeCode: number;
  department: string;
  createdAt: string;
  creratedBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  status: boolean;
};

export type Post = {
  id: number;
  islandID: number | null;
  userID: number | null;
  eventID: number | null;
  status: boolean;
};

export type Message = {
  id: number;
  message: string;
  postID: number;
  scout: boolean;
  isRead: boolean;
  isAnswered: boolean;
  status: boolean;
  postedBy: number;
  posts: Post[];
  users: User[];
}[];

export type newUsersData = {
  id: any;
  name: any;
}[];
