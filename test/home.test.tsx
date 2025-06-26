import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LandingPage from "@/app/page";

describe("Landing Page", () => {
  it("renders landing page with navigation options", () => {
    render(<LandingPage />);

    expect(screen.getByText("Conversational Commerce AI")).toBeInTheDocument();
    expect(screen.getByText("Choose Your Experience")).toBeInTheDocument();
  });

  it("renders chat interface option", () => {
    render(<LandingPage />);

    expect(screen.getByText("💬 Interactive Chat")).toBeInTheDocument();
    expect(screen.getByText("Launch Chat Interface")).toBeInTheDocument();
  });

  it("renders SSE demo option", () => {
    render(<LandingPage />);

    expect(screen.getByText("🌊 SSE Endpoint Demo")).toBeInTheDocument();
    expect(screen.getByText("View SSE Demo")).toBeInTheDocument();
  });

  it("renders technical overview", () => {
    render(<LandingPage />);

    expect(screen.getByText("Technical Overview")).toBeInTheDocument();
    expect(screen.getByText("OpenAI GPT-4")).toBeInTheDocument();
  });
});