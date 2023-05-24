export type Island = {
  id: number;
  islandName: string;
  thumbnail: string;
  detail: string;
  ownerID: number;
  createdAt: number;
  creratedBy: string;
  updatedAt?: number;
  updatedBy?: string;
  status: boolean;
};

export type User = {
  id: number;
  familyName: string;
  firstName: string;
  familyNameKana: string;
  firstNameKana: string;
  mailAddress: string;
  password: string;
  icon: string;
  employeeCode: number;
  department: string;
  createdAt: number;
  creratedBy: string;
  updatedAt?: number;
  updatedBy?: string;
  status: boolean;
};

export type LoginUser = {
  id: number;
  familyName: string;
  firstName: string;
  icon: string;
};

export type Event = {
  id: string;
  eventName: string;
  detail: string;
  startDate: Date;
  endDate: Date;
  thumbnail: string;
  createdAt: number;
  creratedBy: string;
  updatedAt?: number;
  updatedBy?: string;
  status: boolean;
  ownerID: number;
};

export type Entryusers = {
  id: number;
  islandID: number;
  userID: number;
  eventID: number;
  users: User;
};
