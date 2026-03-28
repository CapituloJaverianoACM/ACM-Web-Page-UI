// WebSocket Actions Enum
export enum WebSocketAction {
  // Outgoing actions (server to client)
  SESSION_CONNECTED = "SESSION_CONNECTED",
  SESSION_RESUME = "SESSION_RESUME",
  SESSION_DISCONNECTED = "SESSION_DISCONNECTED",
  MATCH_FOUND = "MATCH_FOUND",
  MATCH_START = "MATCH_START",
  MATCH_END = "MATCH_END",
  MATCH_CANCELLED = "MATCH_CANCELLED",
  USER_READY = "USER_READY",
  USER_NOT_READY = "USER_NOT_READY",
  USER_JOINED = "USER_JOINED",
  USER_LEFT = "USER_LEFT",
  PROBLEM_ASSIGNED = "PROBLEM_ASSIGNED",
  WINNER = "WINNER",
  LOSER = "LOSER",
  CONTINUE = "CONTINUE",
  ERROR = "ERROR",
  PING = "PING",
  PONG = "PONG",

  // Incoming actions (client to server)
  READY = "READY",
  NOT_READY = "NOT_READY",
  CHECK = "CHECK",
}

// Base WebSocket Message Interface
export interface BaseWebSocketMessage<T = any> {
  action: WebSocketAction;
  data: T;
  timestamp?: number;
}

// Specific Data Types for Each Action

// Connection & Session
export interface SessionConnectedData {
  pairKey: string;
  contestId: number;
  userId: number;
  isReconnection: boolean;
}

export interface SessionResumeData {
  pairKey: string;
  contestId: number;
  currentProblem?: {
    contestId: number;
    index: string;
    name: string;
    rating: number;
  } | null;
  isActive: boolean;
  isFinished: boolean;
  users: Array<{
    userId: number;
    handle: string | null;
    isReady: boolean;
  }>;
}

export interface SessionDisconnectedData {
  pairKey: string;
  userId: number;
  reason: "disconnect" | "session_end" | "error";
}

// Match Management
export interface MatchFoundData {
  pairKey: string;
  opponent: {
    userId: number;
    handle: string | null;
  };
}

export interface MatchStartData {
  pairKey: string;
  problem: {
    contestId: number;
    index: string;
    name: string;
    rating: number;
    url: string;
  };
  timeLimit?: number;
}

export interface MatchEndData {
  pairKey: string;
  winner: number;
  loser: number;
  duration: number;
  problemSolved: boolean;
}

export interface MatchCancelledData {
  pairKey: string;
  reason: "user_disconnected" | "timeout" | "error";
}

// User Actions
export interface UserReadyData {
  pairKey: string;
  userId: number;
  handle: string;
  solvedProblems: number;
}

export interface UserNotReadyData {
  pairKey: string;
  userId: number;
}

export interface UserJoinedData {
  pairKey: string;
  user: {
    userId: number;
    handle: string | null;
  };
}

export interface UserLeftData {
  pairKey: string;
  userId: number;
}

// Game Actions
export interface ProblemAssignedData {
  pairKey: string;
  problem: {
    contestId: number;
    index: string;
    name: string;
    rating: number;
    url: string;
  };
}

export interface WinnerData {
  pairKey: string;
  userId: number;
}

export interface LoserData {
  pairKey: string;
  userId: number;
  opponent: {
    userId: number;
    handle: string | null;
  };
}

export interface ContinueData {
  pairKey: string;
  userId: number;
}

// Error Handling
export interface ErrorData {
  code: string;
  message: string;
  context?: string;
  details?: any;
}

// System Messages
export interface PingData {
  timestamp: number;
}

export interface PongData {
  timestamp: number;
  originalTimestamp: number;
}

// Incoming Messages (Client to Server)
export interface ReadyData {
  handle: string;
}

export interface NotReadyData {
  // No additional data needed
}

export interface CheckData {
  // No additional data needed
}

// Message Type Mapping
export type WebSocketMessageMap = {
  // Outgoing messages (server to client)
  [WebSocketAction.SESSION_CONNECTED]: BaseWebSocketMessage<SessionConnectedData>;
  [WebSocketAction.SESSION_RESUME]: BaseWebSocketMessage<SessionResumeData>;
  [WebSocketAction.SESSION_DISCONNECTED]: BaseWebSocketMessage<SessionDisconnectedData>;
  [WebSocketAction.MATCH_FOUND]: BaseWebSocketMessage<MatchFoundData>;
  [WebSocketAction.MATCH_START]: BaseWebSocketMessage<MatchStartData>;
  [WebSocketAction.MATCH_END]: BaseWebSocketMessage<MatchEndData>;
  [WebSocketAction.MATCH_CANCELLED]: BaseWebSocketMessage<MatchCancelledData>;
  [WebSocketAction.USER_READY]: BaseWebSocketMessage<UserReadyData>;
  [WebSocketAction.USER_NOT_READY]: BaseWebSocketMessage<UserNotReadyData>;
  [WebSocketAction.USER_JOINED]: BaseWebSocketMessage<UserJoinedData>;
  [WebSocketAction.USER_LEFT]: BaseWebSocketMessage<UserLeftData>;
  [WebSocketAction.PROBLEM_ASSIGNED]: BaseWebSocketMessage<ProblemAssignedData>;
  [WebSocketAction.WINNER]: BaseWebSocketMessage<WinnerData>;
  [WebSocketAction.LOSER]: BaseWebSocketMessage<LoserData>;
  [WebSocketAction.CONTINUE]: BaseWebSocketMessage<ContinueData>;
  [WebSocketAction.ERROR]: BaseWebSocketMessage<ErrorData>;
  [WebSocketAction.PING]: BaseWebSocketMessage<PingData>;
  [WebSocketAction.PONG]: BaseWebSocketMessage<PongData>;

  // Incoming messages (client to server)
  [WebSocketAction.READY]: BaseWebSocketMessage<ReadyData>;
  [WebSocketAction.NOT_READY]: BaseWebSocketMessage<NotReadyData>;
  [WebSocketAction.CHECK]: BaseWebSocketMessage<CheckData>;
};

// Union types for incoming and outgoing messages
export type OutgoingWebSocketMessage =
  | BaseWebSocketMessage<SessionConnectedData>
  | BaseWebSocketMessage<SessionResumeData>
  | BaseWebSocketMessage<SessionDisconnectedData>
  | BaseWebSocketMessage<MatchFoundData>
  | BaseWebSocketMessage<MatchStartData>
  | BaseWebSocketMessage<MatchEndData>
  | BaseWebSocketMessage<MatchCancelledData>
  | BaseWebSocketMessage<UserReadyData>
  | BaseWebSocketMessage<UserNotReadyData>
  | BaseWebSocketMessage<UserJoinedData>
  | BaseWebSocketMessage<UserLeftData>
  | BaseWebSocketMessage<ProblemAssignedData>
  | BaseWebSocketMessage<WinnerData>
  | BaseWebSocketMessage<LoserData>
  | BaseWebSocketMessage<ContinueData>
  | BaseWebSocketMessage<ErrorData>
  | BaseWebSocketMessage<PingData>
  | BaseWebSocketMessage<PongData>;

export type IncomingWebSocketMessage =
  | BaseWebSocketMessage<ReadyData>
  | BaseWebSocketMessage<NotReadyData>
  | BaseWebSocketMessage<CheckData>;

// Union type for all possible messages
export type WebSocketMessage =
  | OutgoingWebSocketMessage
  | IncomingWebSocketMessage;

// Helper function to create typed messages
export function createWebSocketMessage<T extends WebSocketAction>(
  action: T,
  data: WebSocketMessageMap[T]["data"],
  timestamp?: number,
): BaseWebSocketMessage<WebSocketMessageMap[T]["data"]> {
  return {
    action,
    data,
    timestamp: timestamp || Date.now(),
  };
}
