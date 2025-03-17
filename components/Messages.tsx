"use client";
import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef } from "react";

const Messages = forwardRef<ComponentRef<typeof motion.div>, Record<never, never>>(function Messages(_, ref) {
  const { messages } = useVoice();

  return (
    <div className="grow rounded-md overflow-auto p-4" ref={ref}>
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => {
            if (msg.type === "user_message" || msg.type === "assistant_message") {
              return (
                <motion.div
                  key={msg.type + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={cn(
                    "w-[80%] p-4",
                    "bg-card shadow-sm",
                    "border border-border rounded-lg",
                    msg.type === "user_message" ? "ml-auto bg-blue-50" : "bg-gray-50"
                  )}
                >
                  <div className={cn("text-sm font-medium mb-2", msg.type === "user_message" ? "text-blue-600" : "text-gray-600")}>
                    {msg.message.role}
                  </div>
                  <div className="text-gray-800 whitespace-pre-wrap">{msg.message.content}</div>
                  <Expressions values={msg.models.prosody?.scores ?? {}} />
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

export default Messages;
