"use client";

import { useChat } from "@ai-sdk/react";
import { Card } from "@/components/ui/card";
import { MessageInput } from "./message-input";
import { MessageList } from "./message-list";

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "/api/chat/stream",
    onFinish: (message) => {
      console.log("🏁 Client: Message finished:", message);
    },
    onError: (error) => {
      console.error("💥 Client: Error:", error);
    },
  });

  // Status values: "submitted" | "streaming" | "ready" | "error"
  const isLoading = status === "submitted" || status === "streaming";

  console.log(
    "📱 Client: Current status:",
    status,
    "Messages count:",
    messages.length,
  );

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Order Status Assistant</h2>
        <p className="text-sm text-muted-foreground">
          Ask me about your order status! Try: "Where's my order R156998803?"
        </p>
      </div>

      <MessageList messages={messages} isLoading={isLoading} />

      <MessageInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Card>
  );
}
