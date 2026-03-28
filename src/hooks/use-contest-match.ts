import { WS_URL } from "@/app/socket";
import { getOpponent } from "@/controllers/contest.controller";
import { getAccessToken } from "@/controllers/supabase.controller";
import { Contestant } from "@/models/contestant.model";
import { WebsocketMessageType } from "@/models/matchmaking.model";
import toast from "react-hot-toast";
import {
  BaseWebSocketMessage,
  MatchStartData,
  OutgoingWebSocketMessage,
  SessionResumeData,
  UserReadyData,
  WebSocketAction,
} from "@/utils/ws-types";
import { useQuery } from "@tanstack/react-query";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { showToast, ToastType } from "@/utils/show-toast";

export type SelectedCodeforcesProblem = {
  name: string;
  link: string;
};
export type useContestResult = [
  boolean,
  boolean,
  Function,
  SelectedCodeforcesProblem | null,
  Contestant | null,
  MouseEventHandler,
];

export const useContestMatch = (
  contest_id: number,
  contestant: Contestant | undefined,
): useContestResult => {
  const [user_ready, setUserReady] = useState<boolean>(false);
  const [opponent_ready, setOpponentReady] = useState<boolean>(false);
  const socket = useRef<WebSocket | null>(null);

  const [codeforces_problem, setCodeforcesProblem] =
    useState<SelectedCodeforcesProblem | null>(null);

  const { data: opponent } = useQuery({
    queryKey: ["opponent", contest_id, contestant?.id],
    queryFn: async () => getOpponent(contest_id, contestant?.id),
    enabled: !!contestant?.id,
  });

  const sleepAndReload = (sec: number) => {
    setTimeout(() => window.location.reload(), sec * 1000);
  };

  const toggleUserReady = () => {
    const out_msg = {
      action: !user_ready
        ? WebsocketMessageType.READY
        : WebsocketMessageType.NOT_READY,
      data: { handle: contestant.codeforces_handle },
    };

    socket.current.send(JSON.stringify(out_msg));
    setUserReady((prev) => !prev);
  };

  const buildCodeforcesURL = (contest: number, letter: string) =>
    `https://codeforces.com/problemset/problem/${contest}/${letter}`;

  const updateUserReady = (own: boolean, isReady: boolean) => {
    if (own) setUserReady(isReady);
    else {
      setOpponentReady(isReady);
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
      updateUserReady(user.userId === contestant.id, user.isReady);
    }
  };

  const handleMatchStart = (msg: BaseWebSocketMessage<MatchStartData>) => {
    setCodeforcesProblem({
      name: msg.data.problem.name,
      link: msg.data.problem.url,
    });
  };

  const onCheckProblem = (e) => {
    const button = e.target as HTMLButtonElement;
    if (button.disabled) return;

    button.disabled = true;
    setTimeout(() => (button.disabled = false), 5000);

    const out_msg = {
      action: WebSocketAction.CHECK,
    };

    if (socket.current) {
      socket.current.send(JSON.stringify(out_msg));
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
            break;
          case WebSocketAction.USER_READY:
            updateUserReady(
              contestant.id ===
                (message as BaseWebSocketMessage<UserReadyData>).data.userId,
              true,
            );
            break;
          case WebSocketAction.USER_NOT_READY:
            updateUserReady(
              contestant.id ===
                (message as BaseWebSocketMessage<UserReadyData>).data.userId,
              false,
            );
            break;
          case WebSocketAction.MATCH_START:
            handleMatchStart(message as BaseWebSocketMessage<MatchStartData>);
            showToast(toast, {
              type: ToastType.WARN,
              message: "Ya se asigno el problema, a resolver!",
            });
            break;
          case WebSocketAction.CONTINUE:
            showToast(toast, {
              type: ToastType.NEUTRAL,
              message: "Sigue compitiendo! Codeforces no reporta AC",
            });
            break;
          case WebSocketAction.WINNER:
            showToast(toast, {
              type: ToastType.OK,
              message: "GANASTE! Vamos a recargar la pagina.",
            });
            sleepAndReload(2);
            break;
          case WebSocketAction.LOSER:
            showToast(toast, {
              type: ToastType.ERROR,
              message: "Perdiste ;( Vamos a recargar la pagina.",
            });
            sleepAndReload(2);
            break;
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

  return [
    user_ready,
    opponent_ready,
    toggleUserReady,
    codeforces_problem,
    opponent,
    onCheckProblem,
  ];
};
