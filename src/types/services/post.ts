import { StatusType } from "../../enums";

export interface ICreatePost {
  status: StatusType;
  title: string;
  description: string;
  content: string;
  categoryId: number[];
  userId: number;
}
