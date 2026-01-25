import { WS_URL } from "@/app/socket";
import { getOpponent } from "@/controllers/contest.controller";
import { getAccessToken } from "@/controllers/supabase.controller";
import { Contestant } from "@/models/contestant.model";
import { WebsocketMessageType } from "@/models/matchmaking.model";
import {
  BaseWebSocketMessage,
  IncomingWebSocketMessage,
  OutgoingWebSocketMessage,
  ReadyData,
  SessionResumeData,
  WebSocketAction,
} from "@/utils/ws-types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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

  const queryClient = useQueryClient();

  const [codeforces_problem, setCodeforcesProblem] =
    useState<SelectedCodeforcesProblem | null>(null);

  const { data: opponent } = useQuery({
    queryKey: ["opponent", contest_id, contestant?.id],
    queryFn: async () => getOpponent(contest_id, contestant?.id),
    enabled: !!contestant?.id,
  });

  const toggleUserReady = () => {
    setUserReady((prev) => {
      const out_msg = {
        action: prev
          ? WebsocketMessageType.READY
          : WebsocketMessageType.NOT_READY,
        data: { handle: contestant.codeforces_handle },
      };

      socket.send(JSON.stringify(out_msg));
      return !prev;
    });
  };

  const buildCodeforcesURL = (contest: number, letter: string) =>
    `https://codeforces.com/problemset/problem/${contest}/${letter}`;

  const updateUser = (own: boolean, isReady: boolean) => {
    if (own) setUserReady(isReady);
    else {
      queryClient.setQueryData(
        ["opponent", contest_id, contestant?.id],
        (oldData: Contestant) => {
          oldData.ready = isReady;
          return oldData;
        },
      );
    }
  };

  const handleSessionResume = (
    msg: BaseWebSocketMessage<SessionResumeData>,
  ) => {
    const incomming_problem = msg.data.currentProblem;
    if (incomming_problem)
      setCodeforcesProblem({
        name: incomming_problem.name,
        link: buildCodeforcesURL(
          incomming_problem.contestId,
          incomming_problem.index,
        ),
      });

    for (const user of msg.data.users) {
      updateUser(user.userId === contest_id, user.isReady);
    }
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
      const message = ev.data as OutgoingWebSocketMessage;
      switch (message.action) {
        case WebSocketAction.SESSION_RESUME:
          handleSessionResume(
            message as BaseWebSocketMessage<SessionResumeData>,
          );
      }
    };

    return () => {
      socket.close();
    };
  }, [socket]);

  return [user_ready, toggleUserReady, codeforces_problem, opponent];
};
