"use client";

import { useState, useEffect } from "react";
import { CallHistoryItem } from "@/types/call";

export const useChatDetail = (chatId: string) => {
  const [chatDetail, setChatDetail] = useState<CallHistoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChatDetail();
  }, [chatId]);

  const fetchChatDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.hume.ai/v0/evi/chats/${chatId}?page_size=100`, {
        headers: {
          "X-Hume-Api-Key": process.env.NEXT_PUBLIC_HUME_API_KEY || "",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch chat detail");

      const data = await response.json();

      console.log("datadatadatadatadata", data);

      setChatDetail({
        id: data.id,
        timestamp: new Date(data.start_timestamp),
        duration: data.end_timestamp ? Math.floor((data.end_timestamp - data.start_timestamp) / 1000) : 0,
        status: data.status.toLowerCase(),
        events: data.event_count,
        messageData: data?.events_page,
        emotionScores: {}, // Add missing property
        transcript: "", // Add missing property
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { chatDetail, loading, error };
};
