"use client";

import { useCallHistory } from "@/hooks/useCallHistory"; // Changed from default import to named import
import { Phone, PhoneOff, PhoneMissed } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Tooltip } from "@/components/ui/tooltip";
import { CallHistoryItem } from "@/types/call";

const CallHistory = () => {
  const { callHistory } = useCallHistory();

  if (!callHistory.length) {
    return (
      <div className="w-64 h-full border-r bg-background p-4">
        <h2 className="text-lg font-semibold mb-4">Call History</h2>
        <p className="text-sm text-muted-foreground">No calls found</p>
      </div>
    );
  }

  console.log("callHistorycallHistorycallHistory", callHistory);

  const getStatusIcon = (status: CallHistoryItem["status"]) => {
    switch (status) {
      case "completed":
        return <Phone className="h-4 w-4 text-green-500" />;
      case "missed":
        return <PhoneMissed className="h-4 w-4 text-red-500" />;
      case "failed":
        return <PhoneOff className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="w-64 h-full border-r bg-background p-4">
      <h2 className="text-lg font-semibold mb-4">Call History</h2>
      <div className="space-y-2">
        {callHistory.map((call: CallHistoryItem) => (
          <Tooltip
            key={call.id}
            content={
              call.emotionScores ? (
                <div className="p-2">
                  <p className="font-semibold">Emotions detected:</p>
                  {Object.entries(call.emotionScores as Record<string, number>).map(([emotion, score]) => (
                    <div key={emotion} className="flex justify-between gap-2">
                      <span className="capitalize">{emotion}:</span>
                      <span>{(score * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              ) : null
            }
          >
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer">
              {getStatusIcon(call.status)}
              <div className="flex flex-col">
                <span className="text-sm font-medium">{formatDistanceToNow(call.timestamp, { addSuffix: true })}</span>
                {call.status === "completed" && (
                  <span className="text-xs text-muted-foreground">
                    Duration: {Math.floor(call.duration / 60)}m {call.duration % 60}s
                  </span>
                )}
                {call.transcript && <span className="text-xs text-muted-foreground truncate max-w-[180px]">{call.transcript}</span>}
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default CallHistory;
