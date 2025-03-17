"use client";

import React, { createContext, useContext, useState } from "react";

export interface Message {
  role: "assistant" | "user";
  content: string;
}

export interface ChatContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
}

// Create context with a default value
const ChatContext = createContext<ChatContextType>({
  messages: [],
  addMessage: () => {},
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return <ChatContext.Provider value={{ messages, addMessage }}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
