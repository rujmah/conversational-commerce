"use client";

import type { Message } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          <p>👋 Hi! I'm here to help with your order status.</p>
          <p className="text-sm mt-2">
            Try asking: "Where's my order R156998803?"
          </p>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <Card
            className={`max-w-[80%] p-3 ${
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant={message.role === "user" ? "secondary" : "outline"}
                className="text-xs"
              >
                {message.role === "user" ? "You" : "Assistant"}
              </Badge>
            </div>
            <p className="whitespace-pre-wrap">{message.content}</p>
          </Card>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <Card className="bg-muted p-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Assistant
              </Badge>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </Card>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
