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
import { useEffect, useRef, useState } from "react";

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
  const socket = useRef(null);
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
        action: !prev
          ? WebsocketMessageType.READY
          : WebsocketMessageType.NOT_READY,
        data: { handle: contestant.codeforces_handle },
      };

      socket.current.send(JSON.stringify(out_msg));
      console.log("SEND ", !prev);
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
          const newData = Object.create(oldData);
          newData.ready = isReady;
          return newData;
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
    let isMounted = true;
    const execute_connection = async () => {
      // Si el componente se desmontó mientras esperábamos el token, abortamos
      if (!isMounted || socket.current) return;

      const token = await getAccessToken();
      socket.current = new WebSocket(
        new URL(
          `/ws/contest/${contest_id}/${contestant.id}/${opponent.id}?token=${token}`,
          WS_URL,
        ),
      );
      socket.current.onopen = () => {
        console.log("CONNECTED to WS");
      };
      socket.current.onclose = () => {
        console.log("DISCONNECTED to WS");
      };

      socket.current.onmessage = (ev) => {
        const message = JSON.parse(ev.data) as OutgoingWebSocketMessage;
        console.log(message);
        switch (message.action) {
          case WebSocketAction.SESSION_RESUME:
            handleSessionResume(
              message as BaseWebSocketMessage<SessionResumeData>,
            );
        }
      };
    };

    execute_connection();

    return () => {
      isMounted = false;
      if (socket.current) {
        socket.current.close();
        socket.current = null;
      }
    };
  }, [opponent?.id]);

  return [user_ready, toggleUserReady, codeforces_problem, opponent];
};
