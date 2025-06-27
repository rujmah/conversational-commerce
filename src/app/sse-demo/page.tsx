"use client";

import posthog from "posthog-js";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SSEDemo() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const inputId = useId();
  const apiKeyId = useId();

  const connectSSE = async () => {
    if (!input.trim()) return;

    setMessages([]);
    setIsConnected(true);

    // Track SSE started event with relevant metadata
    if (typeof posthog.capture === "function") {
      posthog.capture("SSE started", {
        input,
        apiKeyPresent: !!apiKey.trim(),
        timestamp: Date.now(),
      });
    }

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (apiKey.trim()) {
        headers["x-api-key"] = apiKey.trim();
      }

      const response = await fetch("/api/sse", {
        method: "POST",
        headers,
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log("🏁 SSE: Stream ended");
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6); // Remove "data: " prefix

            if (data === "[DONE]") {
              console.log("✅ SSE: Received DONE signal");
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              console.log("📨 SSE: Received event:", parsed);

              if (parsed.type === "chunk") {
                setMessages((prev) => [...prev, `CHUNK: ${parsed.content}`]);
              } else {
                setMessages((prev) => [
                  ...prev,
                  `${parsed.type.toUpperCase()}: ${parsed.message || JSON.stringify(parsed)}`,
                ]);
              }
            } catch (_e) {
              console.log("📝 SSE: Raw data:", data);
              setMessages((prev) => [...prev, `RAW: ${data}`]);
            }
          }
        }
      }
    } catch (error) {
      console.error("💥 SSE: Connection error:", error);
      setMessages((prev) => [...prev, `ERROR: ${error}`]);
    } finally {
      setIsConnected(false);
    }
  };

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="container mx-auto py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">SSE Endpoint Demo</h1>
          <p className="text-muted-foreground">
            Test the Server-Sent Events endpoint with order status queries
          </p>
          <div className="mt-4">
            <a href="/" className="text-primary hover:underline text-sm mr-4">
              ← Back to Home
            </a>
            <a href="/chat" className="text-primary hover:underline text-sm">
              → Try Chat Interface
            </a>
          </div>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor={apiKeyId}
                className="block text-sm font-medium mb-2"
              >
                API Key (optional - leave empty if SSE_API_KEY not configured)
              </label>
              <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold text-sm">⚠️</span>
                  <div className="text-yellow-800 text-xs">
                    <strong>Security Warning:</strong> This demo exposes API
                    keys in the browser. Only use for development/testing. For
                    production, implement server-side authentication or use
                    session-based tokens instead of raw API keys.
                  </div>
                </div>
              </div>
              <input
                id={apiKeyId}
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API key if required..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                disabled={isConnected}
              />
            </div>
            <div>
              <label
                htmlFor={inputId}
                className="block text-sm font-medium mb-2"
              >
                Test Message (try: "Where's my order R156998803 for
                mobile.developer+22@on-running.com?")
              </label>
              <div className="flex gap-2">
                <input
                  id={inputId}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your message..."
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isConnected}
                />
                <Button
                  onClick={connectSSE}
                  disabled={isConnected || !input.trim()}
                >
                  {isConnected ? "Streaming..." : "Send SSE Request"}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">SSE Events Log</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No events yet. Send a message to see SSE events stream in
                real-time.
              </p>
            ) : (
              messages.map((message, index) => (
                <div
                  key={`${Date.now()}-${index}`}
                  className="p-2 bg-muted rounded text-sm font-mono"
                >
                  {message}
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">SSE Endpoint Details</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Endpoint:</strong> <code>/api/sse</code>
            </p>
            <p>
              <strong>Method:</strong> POST
            </p>
            <p>
              <strong>Content-Type:</strong> text/event-stream
            </p>
            <p>
              <strong>Authentication:</strong> x-api-key header (optional)
            </p>
            <p>
              <strong>Event Types:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <code>connected</code> - Initial connection established
              </li>
              <li>
                <code>typing</code> - AI is processing the request
              </li>
              <li>
                <code>chunk</code> - Streaming text content
              </li>
              <li>
                <code>completed</code> - Response finished with summary
              </li>
              <li>
                <code>error</code> - Error occurred during processing
              </li>
              <li>
                <code>[DONE]</code> - Final termination signal
              </li>
            </ul>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">cURL Example with API Key:</h4>
              <code className="text-xs block whitespace-pre-wrap">
                {`curl -X POST http://localhost:3000/api/sse \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: your_api_key_here" \\
  -d '{"message": "Where is my order R156998803?"}' \\
  --no-buffer`}
              </code>

              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                <div className="flex items-start gap-2">
                  <span className="text-red-600 font-bold text-sm">🔒</span>
                  <div className="text-red-800 text-xs">
                    <strong>Production Security:</strong> Never expose API keys
                    in client-side code. Use server-side proxies, environment
                    variables, or secure authentication flows for production
                    deployments.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
