"use client";

import { useState, useEffect } from "react";
import { CallHistoryItem } from "@/types/call";
import type { HumeCallSessionResponse } from "@/types/hume";

function useCallHistory() {
  const [callHistory, setCallHistory] = useState<CallHistoryItem[]>([]);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch("https://api.hume.ai/v0/evi/chats?page_size=100", {
        headers: {
          "X-Hume-Api-Key": process.env.NEXT_PUBLIC_HUME_API_KEY || "",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch chat history");

      const data: HumeCallSessionResponse = await response.json();

      const historyCalls: CallHistoryItem[] = data.chats_page.map((session) => ({
        id: session.id,
        timestamp: new Date(session.start_timestamp),
        duration: session.end_timestamp ? Math.floor((session.end_timestamp - session.start_timestamp) / 1000) : 0,
        status: session.status.toLowerCase(),
        emotionScores: {},
        transcript: "",
        events: session?.event_count,
        messageData: session.messages || [], // Add messageData with default empty array
      }));

      setCallHistory((prev) => {
        const existingIds = new Set(prev.map((call) => call.id));
        const uniqueNewCalls = historyCalls.filter((call) => !existingIds.has(call.id));
        return [...uniqueNewCalls, ...prev];
      });
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  return { callHistory };
}

export { useCallHistory };
