import { LevelEnum } from "./level.enum";
import { Picture } from "./picture.model";

export interface Contest {
  id: number;
  name: string;
  date: Date;
  start_hour: Date;
  final_hour: Date;
  level: string | LevelEnum;
  classroom: string;
  picture?: Picture;
  registered?: boolean;
  checkin?: boolean;
}
