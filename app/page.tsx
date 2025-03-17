"use client";

import { useCallHistory } from "@/hooks/useCallHistory";
import CallHistoryList from "@/components/CallHistoryList";

export default function Home() {
  const { callHistory } = useCallHistory();

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Call History</h1>
      <CallHistoryList callHistory={callHistory} />
    </main>
  );
}
