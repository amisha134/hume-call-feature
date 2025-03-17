import { CallHistoryItem } from "@/types/call";
import Link from "next/link";

interface CallHistoryListProps {
  callHistory: CallHistoryItem[];
}

const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block h-4 w-4 mr-1 text-gray-500"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const TimeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block h-4 w-4 mr-1 text-gray-500"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-green-700"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const CallHistoryList = ({ callHistory }: CallHistoryListProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes > 0 ? `${minutes}m ` : ""}${remainingSeconds}s`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {callHistory.map((call) => (
        <div key={call.id} className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm hover:shadow transition-all">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <CheckIcon />
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base font-semibold">{call.id}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(call.timestamp)}</p>
                </div>
                <Link
                  href={`/history/${call.id}`}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                >
                  View Details
                </Link>
              </div>

              <div className="mt-4 flex items-center gap-6">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MessageIcon />
                  {call.events} events
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <TimeIcon />
                  {formatDuration(call.duration)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CallHistoryList;
