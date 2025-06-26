import type { Metadata } from "next";
import { ChatInterface } from "@/components/chat/chat-interface";

export const metadata: Metadata = {
  title: "Chat Interface - Conversational Commerce AI",
  description:
    "Interactive chat interface for AI-powered order status assistance with real-time streaming responses.",
};

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-background p-4">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Order Status Assistant</h1>
          <p className="text-muted-foreground">
            Get real-time updates on your order status through our AI assistant
          </p>
          <div className="mt-4">
            <a href="/" className="text-primary hover:underline text-sm mr-4">
              ← Back to Home
            </a>
            <a
              href="/sse-demo"
              className="text-primary hover:underline text-sm"
            >
              → View SSE Demo
            </a>
          </div>
        </div>

        <ChatInterface />
      </div>
    </main>
  );
}
