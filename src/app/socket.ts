import { BACKEND_URL } from "@/config/env";
import { io, Socket } from "socket.io-client";

const base_url = BACKEND_URL.split("https://")[1];
export const WS_URL = `wss://${base_url}`;
export const createWebSocket = (
  contest_id: number,
  local_id: number,
  opponent_id: number,
): Socket => {
  return io(WS_URL, {
    path: `/ws/contest/${contest_id}/${local_id}/${opponent_id}`,
  });
};
