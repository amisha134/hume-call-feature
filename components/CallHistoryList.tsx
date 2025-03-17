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
    <div className="space-y-2.5">
      {callHistory.map((call) => (
        <div key={call.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                <CheckIcon />
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{call.id}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{formatDate(call.timestamp)}</p>
                </div>
                <Link
                  href={`/history/${call.id}`}
                  className="box-border inline-flex items-center justify-center gap-1.5 border font-medium transition cursor-pointer [&_*]:cursor-[inherit] focus:outline-none focus-visible:ring disabled:cursor-not-allowed disabled:opacity-70 [&_svg]:opacity-60 ![&_svg]:pointer-events-none data-[icon-only]:shrink-0 rounded-full grow-0 no-underline h-10 px-5 text-base leading-5 data-[icon-only]:w-10 data-[icon-only]:px-0 [&_svg]:size-5 border-border-input bg-transparent hover:bg-background-selected focus-visible:border-border-input-focus focus-visible:bg-background focus-visible:ring-neutral-200/40"
                >
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium">Open</span>
                </Link>
              </div>

              <div className="mt-3 flex items-center gap-6">
                <p className="text-xs text-gray-600 flex items-center gap-1.5">
                  <MessageIcon />
                  {call.events} events
                </p>
                <p className="text-xs text-gray-600 flex items-center gap-1.5">
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
