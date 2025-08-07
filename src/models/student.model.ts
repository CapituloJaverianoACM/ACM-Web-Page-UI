import { LevelEnum } from "./level.enum";

export interface Student {
  id: number;
  name: string;
  surname: string;
  level: LevelEnum;
  victory_count: number;
  matches_count: number;
  avatar: string;
  supabase_user_id: string;
}