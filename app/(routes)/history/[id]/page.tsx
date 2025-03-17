"use client";

import { useChatDetail } from "@/hooks/useChatDetail";
import { cn } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { ComponentRef, forwardRef } from "react";
import { UserCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface MessagesProps {
  chatDetail: any; // Replace 'any' with your actual ChatDetail type if available
}

const Messages = forwardRef<ComponentRef<typeof motion.div>, MessagesProps>(function Messages({ chatDetail }, ref) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-6 p-6 my-6 border rounded-lg bg-background shadow-sm">
        <AnimatePresence mode="popLayout">
          {chatDetail?.messageData?.map((msg: any, index: number) => {
            if (msg.type === "USER_MESSAGE" || msg.type === "AGENT_MESSAGE") {
              const isUser = msg.type === "USER_MESSAGE";
              const isLastMessage = index === chatDetail.messageData.length - 1;
              return (
                <motion.div
                  ref={index === 0 ? ref : undefined}
                  key={msg.type + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className={cn("flex items-start gap-3", isUser ? "flex-row-reverse" : "", isLastMessage ? "mb-4" : "")}
                >
                  <div className={cn("flex-shrink-0", isUser ? "ml-2" : "mr-2")}>
                    {isUser ? (
                      <div className="size-9 bg-primary/10 rounded-full flex items-center justify-center">
                        <UserCircle className="size-5 text-primary" />
                      </div>
                    ) : (
                      <div className="size-9 bg-secondary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-secondary-foreground">AI</span>
                      </div>
                    )}
                  </div>
                  <div className={cn("flex flex-col gap-1.5 max-w-[80%]", isUser ? "items-end" : "items-start")}>
                    <div
                      className={cn(
                        "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                        isUser ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-secondary/10 text-secondary-foreground rounded-tl-sm"
                      )}
                    >
                      {msg.message_text}
                    </div>
                    <span className="text-[11px] text-muted-foreground px-1">
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
  );
});

export default function ChatDetailPage() {
  const params = useParams();

  if (!params) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Invalid parameters</p>
      </div>
    );
  }

  const chatId = params.id as string;
  const { chatDetail, loading, error } = useChatDetail(chatId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-destructive text-center">
          <p className="font-semibold">Error loading conversation</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!chatDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Conversation not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-muted/50 to-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-3xl mx-auto px-4 flex h-16 items-center gap-4">
          <Link href="/history" className="inline-flex items-center justify-center size-9 rounded-md border hover:bg-accent">
            <ArrowLeft className="size-5" />
          </Link>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">Conversation #{chatId}</h2>
            <p className="text-sm text-muted-foreground">{chatDetail?.messageData?.length || 0} messages</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <Messages chatDetail={chatDetail} />
      </div>
    </div>
  );
}
