"use client";

import { useChatDetail } from "@/hooks/useChatDetail";
import { cn } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { ComponentRef, forwardRef } from "react";
import { UserCircle } from "lucide-react";

interface MessagesProps {
  chatDetail: any; // Replace 'any' with your actual ChatDetail type if available
}

const Messages = forwardRef<ComponentRef<typeof motion.div>, MessagesProps>(function Messages({ chatDetail }, ref) {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Chat History</h2>
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-6">
            <AnimatePresence mode="popLayout">
              {chatDetail?.messageData?.map((msg: any, index: number) => {
                if (msg.type === "USER_MESSAGE" || msg.type === "AGENT_MESSAGE") {
                  const isUser = msg.type === "USER_MESSAGE";
                  return (
                    <motion.div
                      ref={index === 0 ? ref : undefined}
                      key={msg.type + index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`flex-shrink-0 ${isUser ? "ml-2" : "mr-2"}`}>
                        {isUser ? (
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            <UserCircle size={20} />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white">AI</div>
                        )}
                      </div>
                      <div className={cn("flex flex-col gap-1 max-w-[80%]", isUser ? "items-end" : "items-start")}>
                        <div
                          className={cn(
                            "px-4 py-2 rounded-2xl",
                            "text-sm",
                            isUser ? "bg-blue-500 text-white rounded-tr-none" : "bg-gray-100 text-gray-800 rounded-tl-none"
                          )}
                        >
                          {msg.message_text}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </motion.div>
                  );
                }
                return null;
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function ChatDetailPage() {
  const params = useParams();

  if (!params) {
    return <div className="p-6">Invalid parameters</div>;
  }

  const chatId = params.id as string;
  const { chatDetail, loading, error } = useChatDetail(chatId);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!chatDetail) return <div className="p-6">Chat not found</div>;

  return (
    <div className="grow rounded-md overflow-auto p-4">
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24">
        <Messages chatDetail={chatDetail} />
      </div>
    </div>
  );
}
