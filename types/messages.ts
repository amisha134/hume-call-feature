export interface ProsodyScores {
  scores: Record<string, number>;
}

export interface MessageModel {
  prosody?: ProsodyScores | null;
  time?: {
    begin: number;
    end: number;
  } | null;
}

export interface BaseMessage {
  type: string;
  message?: {
    role: string;
    content: string;
  };
  models?: MessageModel;
}

export interface UserMessage extends BaseMessage {
  type: "user_message";
  message: {
    role: "user";
    content: string;
  };
  models: MessageModel;
}

export interface AssistantMessage extends BaseMessage {
  type: "assistant_message";
  message: {
    role: "assistant";
    content: string;
  };
  models: MessageModel;
}

export interface SystemMessage extends BaseMessage {
  type: "socket_connected" | "socket_disconnected" | "error";
  receivedAt: Date;
}

export type HumeMessage = UserMessage | AssistantMessage;
export type VoiceMessage = HumeMessage | SystemMessage;
