import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/utils";
import { ChatProvider } from "@/context/ChatContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { VoiceProvider } from "@humeai/voice-react";

const HUME_API_KEY = process.env.NEXT_PUBLIC_HUME_API_KEY || "";

type VoiceConfig = {
  auth: {
    type: "apiKey";
    value: string;
  };
  config: {
    enableProsody: boolean;
    enableTranscript: boolean;
  };
};

const voiceConfig: VoiceConfig = {
  auth: {
    type: "apiKey" as const, // Use const assertion
    value: HUME_API_KEY,
  },
  config: {
    enableProsody: true,
    enableTranscript: true,
  },
};

export const metadata: Metadata = {
  title: "Hume AI - EVI - Next.js Starter",
  description: "A Next.js starter using Hume AI's Empathic Voice Interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(GeistSans.variable, GeistMono.variable, "min-h-screen bg-background antialiased")}>
        <VoiceProvider {...voiceConfig}>
          <ChatProvider>
            <TooltipProvider>
              <div className="relative flex min-h-screen">
                {/* Fixed sidebar */}
                <div className="fixed inset-y-0 left-0 w-[200px] z-30">
                  <Sidebar />
                </div>

                {/* Main content */}
                <div className="flex-1 flex flex-col ml-[200px]">
                  <Nav />
                  <main className="flex-1">{children}</main>
                </div>
              </div>
            </TooltipProvider>
          </ChatProvider>
        </VoiceProvider>
      </body>
    </html>
  );
}
