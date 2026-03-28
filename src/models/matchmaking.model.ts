export type MatchmakingTreeNode = {
  student_id: null | number;
  left: null | MatchmakingTreeNode;
  right: null | MatchmakingTreeNode;
};

export enum WebsocketMessageType {
  READY = "READY",
  NOT_READY = "NOT_READY",
  CHECK = "CHECK", // Verify if handle sends a problem
  PING = "PING",
  START_CONTEST = "START_CONTEST",
}

export type WebsocketReadyPayload = {
  handle: string;
};

export type WebsocketReadyMessage = {
  action: WebsocketMessageType.READY;
  data: WebsocketReadyPayload;
};

export type WebsocketNotReadyMessage = {
  action: WebsocketMessageType.NOT_READY;
};

export type WebsocketCheckMessage = {};
