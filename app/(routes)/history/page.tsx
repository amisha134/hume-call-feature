"use client";

import CallHistoryList from "@/components/CallHistoryList";
import { useCallHistory } from "@/hooks/useCallHistory";

export default function HistoryPage() {
  const { callHistory } = useCallHistory();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Call History</h1>
        <p className="text-muted-foreground mt-2">View your recent call sessions and their details.</p>
      </div>
      <CallHistoryList callHistory={callHistory} />
    </div>
  );
}
