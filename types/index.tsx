import { type } from "os";

export type Island = {
  islandID: number;
  islandName: string;
  thumbnail: string;
  detail: string;
  ownerID: number;
  createdAt: number;
  creratedBy: string;
  updatedAt: number;
  updatedBy: string;
  status: boolean;
};

export type Person = {
  userID: number;
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
  updatedAt: number;
  updatedBy: string;
  status: boolean;
};

export type LoginUser = {
  userID: number;
  familyName: string;
  firstName: string;
  icon: string;
};

export type Event = {
  eventID: string;
  eventName: string;
  detail: string;
  startDate: Date;
  endDate: Date;
  thumbnail: string;
  createdAt: number;
  creratedBy: string;
  updatedAt: number;
  updatedBy: string;
  status: boolean;
};
