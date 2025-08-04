import { LevelEnum } from "./level.enum";

export interface Student {
  _id: string;
  name: string;
  surname: string;
  level: LevelEnum;
  victory_count: number;
  matches_count: number;
  avatar: string;
}