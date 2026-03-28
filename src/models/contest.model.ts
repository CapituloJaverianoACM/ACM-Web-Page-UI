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

export const enum ContestMatchResult {
  NO_CONTEST = "No hay un contest que coincida con este id.",
  NO_TREE = "No existe un matchmaking aun.",
  NO_USERS = "No hay participantes.",
  EMPTY = "",
  OK = "Todo fue bien.",
  NO_PARTICIPANT = "No eres un participante de este contest.",
  NO_LOGGED = "El usuario no esta loggeado.",
}
