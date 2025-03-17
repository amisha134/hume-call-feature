export interface HumeChatResponse {
  chats: Array<{
    id: string;
    created_at: string;
    messages: Array<{
      content: string;
      role: "user" | "assistant";
      created_at: string;
      emotions?: {
        prosody?: {
          scores: Record<string, number>;
        };
      };
    }>;
  }>;
}

export interface HumeCallSession {
  id: string;
  start_timestamp: number;
  end_timestamp: number;
  status: string;
  event_count: number;
  messages: Array<{
    type: "USER_MESSAGE" | "AGENT_MESSAGE";
    message_text: string;
    timestamp: number;
  }>;
  chat_group_id: string;
  tag: string | null;
  metadata: any | null;
  config: any | null;
}

export interface HumeCallSessionResponse {
  chats_page: HumeCallSession[];
}
