import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ChatPage from "@/app/chat/page";

describe("Chat Page", () => {
  it("renders chat page with title and navigation", () => {
    render(<ChatPage />);

    expect(screen.getAllByText("Order Status Assistant")).toHaveLength(2);
    expect(
      screen.getByText(/Get real-time updates on your order status/),
    ).toBeInTheDocument();
    expect(screen.getByText("← Back to Home")).toBeInTheDocument();
    expect(screen.getByText("→ View SSE Demo")).toBeInTheDocument();
  });

  it("renders chat interface", () => {
    render(<ChatPage />);

    expect(
      screen.getByText(/Ask me about your order status!/),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ask about your order status..."),
    ).toBeInTheDocument();
  });
});