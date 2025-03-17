"use client";

import CallHistoryList from "@/components/CallHistoryList";
import { useCallHistory } from "@/hooks/useCallHistory";

export default function HistoryPage() {
  const { callHistory } = useCallHistory();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Call History</h1>
      <CallHistoryList callHistory={callHistory} />
    </div>
  );
}
