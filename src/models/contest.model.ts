import { LevelEnum } from "./level.enum";
import { Picture } from "./picture.model";

export interface Contest {
  _id: string;
  name: string;
  date: Date,
  start_hour: Date,
  final_hour: Date,
  level: LevelEnum,
  classroom: string,
  picture?: Picture
}