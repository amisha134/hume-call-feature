export type MessageRole = "user" | "assistant";
export type MessageType = "user_message" | "assistant_message" | "socket_connected" | "socket_disconnected" | "error";

export interface VoiceModels {
  prosody?: {
    scores: Record<string, number>;
  } | null;
}

export interface UserMessage {
  type: "user_message";
  message: {
    role: "user";
    content: string;
  };
  models: VoiceModels;
}

export interface AssistantMessage {
  type: "assistant_message";
  message: {
    role: "assistant";
    content: string;
  };
  models: VoiceModels;
}

export interface SystemMessage {
  type: "socket_connected" | "socket_disconnected" | "error";
  receivedAt: Date;
}

export type VoiceMessage = UserMessage | AssistantMessage | SystemMessage;

export function isUserOrAssistantMessage(message: VoiceMessage): message is UserMessage | AssistantMessage {
  return message.type === "user_message" || message.type === "assistant_message";
}
