import { createWebSocket, WS_URL } from "@/app/socket";
import { getOpponent } from "@/controllers/contest.controller";
import { getAccessToken } from "@/controllers/supabase.controller";
import { Contestant } from "@/models/contestant.model";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export type SelectedCodeforcesProblem = {
  name: string;
  link: string;
};

const TEST_CODEFORCES_PROBLEM = {
  name: "Perfect Root",
  link: "https://codeforces.com/contest/2185/problem/A",
};

export type useContestResult = [
  boolean,
  Function,
  SelectedCodeforcesProblem | null,
  Contestant | null,
];

export const useContestMatch = (
  contest_id: number,
  contestant: Contestant | undefined,
): useContestResult => {
  const [user_ready, setUserReady] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [transport, setTransport] = useState<string>("N/A");

  const [codeforces_problem, setCodeforcesProblem] =
    useState<SelectedCodeforcesProblem | null>(null);

  const { data: opponent } = useQuery({
    queryKey: ["opponent", contest_id, contestant?.id],
    queryFn: async () => getOpponent(contest_id, contestant?.id),
    enabled: !!contestant?.id,
  });

  const toggleUserReady = () => {
    setUserReady((prev) => !prev);
  };
  useEffect(() => {
    if (!opponent) return;
    const execute_connection = async () => {
      const token = await getAccessToken();
      setSocket(
        new WebSocket(
          new URL(
            `/ws/contest/${contest_id}/${contestant.id}/${opponent.id}?token=${token}`,
            WS_URL,
          ),
        ),
      );
    };

    execute_connection();
  }, [opponent]);

  useEffect(() => {
    if (!socket) return;

    socket.onopen = (ev) => {
      console.log("CONNECTED to WS");
    };
    socket.onclose = (ev) => {
      console.log("DISCONNECTED to WS");
    };

    socket.onmessage = (ev) => {
      console.log(ev.data);
    };

    return () => {
      socket.close();
    };
  }, [socket]);

  return [user_ready, toggleUserReady, codeforces_problem, opponent];
};
