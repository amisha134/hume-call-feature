type ProsodyScores = Record<string, number>;

export interface HumeMessage {
  type: "user_message" | "assistant_message";
  message: {
    role: "user" | "assistant";
    content: string;
  };
  models: {
    prosody?: {
      scores: ProsodyScores;
    } | null;
  };
}

export interface SystemMessage {
  type: "socket_connected" | "socket_disconnected" | "error";
  receivedAt: Date;
}

export type VoiceMessage = HumeMessage | SystemMessage;
