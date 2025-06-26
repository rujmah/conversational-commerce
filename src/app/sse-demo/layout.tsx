import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SSE Demo - Conversational Commerce AI",
  description:
    "Test the Server-Sent Events API endpoint with real-time event monitoring and debugging interface.",
};

export default function SSEDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
