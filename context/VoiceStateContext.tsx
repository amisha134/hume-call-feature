import React, { createContext, useContext, useState } from "react";

export type VoiceStatus = "IDLE" | "SPEAKING" | "RECORDING" | "CONNECTING";

interface VoiceStateContextType {
  botSpeaking: boolean;
  userSpeaking: boolean;
  setBotSpeaking: (value: boolean) => void;
  setUserSpeaking: (value: boolean) => void;
}

const VoiceStateContext = createContext<VoiceStateContextType | undefined>(undefined);

export function VoiceStateProvider({ children }: { children: React.ReactNode }) {
  const [botSpeaking, setBotSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);

  return <VoiceStateContext.Provider value={{ botSpeaking, userSpeaking, setBotSpeaking, setUserSpeaking }}>{children}</VoiceStateContext.Provider>;
}

export function useVoiceState() {
  const context = useContext(VoiceStateContext);
  if (context === undefined) {
    throw new Error("useVoiceState must be used within a VoiceStateProvider");
  }
  return context;
}
