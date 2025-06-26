// test landing page with vitest

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";

describe("LandingPage", () => {
	it("should render basic content", () => {
		render(<Home />);
		expect(screen.getByText("Degu IO Boilerplate")).toBeInTheDocument();
		expect(screen.queryByText("Electric Boogaloo")).not.toBeInTheDocument();
		expect(screen.getByTestId("features")).toBeInTheDocument();
	});

	it("should render shadcn Card components for features", () => {
		render(<Home />);
		expect(screen.getByTestId("features-card")).toBeInTheDocument();
	});

	it("should render shadcn Button components", () => {
		render(<Home />);
		expect(screen.getByRole("link", { name: /learn more/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument();
	});

	it("should render technology badges", () => {
		render(<Home />);
		expect(screen.getAllByText("Next.js 15")).toHaveLength(2); // badge and list item
		expect(screen.getAllByText("React 19")).toHaveLength(2);
		expect(screen.getAllByText("TypeScript")).toHaveLength(2);
	});

	it("should have interactive buttons and links", async () => {
		const user = userEvent.setup();
		render(<Home />);
		
		const learnMoreLink = screen.getByRole("link", { name: /learn more/i });
		expect(learnMoreLink).toHaveAttribute("href", "https://github.com/degu-io/nextjs-biome-boilerplate");
		expect(learnMoreLink).toHaveAttribute("target", "_blank");
		
		const getStartedButton = screen.getByRole("button", { name: /get started/i });
		await user.click(getStartedButton);
		// Button should be clickable without throwing
	});

	it("should render separator between sections", () => {
		render(<Home />);
		expect(screen.getByTestId("features-separator")).toBeInTheDocument();
	});

	it("should render theme switcher button", () => {
		render(<Home />);
		expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
	});

	it("should open theme switcher dropdown when clicked", async () => {
		const user = userEvent.setup();
		render(<Home />);
		
		const themeSwitcher = screen.getByRole("button", { name: /toggle theme/i });
		await user.click(themeSwitcher);
		
		expect(screen.getByText("Light")).toBeInTheDocument();
		expect(screen.getByText("Dark")).toBeInTheDocument();
		expect(screen.getByText("System")).toBeInTheDocument();
	});
});
