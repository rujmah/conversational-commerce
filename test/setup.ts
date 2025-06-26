import "@testing-library/jest-dom";

import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, vi } from "vitest";

// Mock scrollIntoView for JSDOM
Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
  writable: true,
  value: vi.fn(),
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
	cleanup();
});

export { userEvent };
