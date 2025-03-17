export interface CallHistoryItem {
  id: string;
  timestamp: Date;
  duration: number;
  status: string;
  emotionScores: Record<string, number>;
  transcript: string;
  events: number;
  messageData: any[];
}
