# Claude Code Project Memory

This file contains project-specific preferences and context for Claude Code sessions.

## Project Overview
- **Name**: Conversational Commerce AI Assistant
- **Type**: AI-powered order status assistant with chat and SSE endpoints
- **Base**: Next.js 15 boilerplate with modern tooling
- **AI Integration**: OpenAI GPT-4 with function calling for order lookup

## Tech Stack
- **Framework**: Next.js 15 with React 19
- **AI**: OpenAI GPT-4 with AI SDK (Vercel)
- **Data**: GraphQL integration for order status
- **Streaming**: Server-Sent Events (SSE) + AI SDK streaming
- **Styling**: TailwindCSS 4 + shadcn/ui components
- **Theming**: next-themes (dark/light/system modes)
- **Linting/Formatting**: Biome
- **Git Hooks**: Lefthook
- **Package Manager**: PNPM
- **Build Tool**: Turbopack
- **Testing**: Vitest + @testing-library/react
- **TypeScript**: Strict mode enabled

## Development Preferences

### Code Quality
- Always run `pnpm lint` and `pnpm test` before committing
- Follow TDD principles when adding new features
- Use proper React patterns (useRef instead of hardcoded IDs)
- Add "use client" directive when using React hooks
- Never ignore linting rules without good reason

### UI/UX Standards
- Mobile-first responsive design
- Minimum 44px touch targets for mobile
- Proper semantic HTML and accessibility
- Dark/light theme support throughout
- Smooth scroll behavior for navigation

### Component Architecture
- Use shadcn/ui components: Badge, Button, Card, Dropdown-menu, Separator
- Theme switching via ThemeSwitcher component
- Proper component composition with asChild pattern
- TypeScript strict typing for all components
- AI SDK integration with `useChat` hook for streaming
- SSE event handling with proper error boundaries

### Testing Strategy
- Comprehensive test coverage for all features
- Mock browser APIs not available in JSDOM (e.g., scrollIntoView)
- Test both functionality and accessibility
- Update tests when component structure changes

### Git Workflow
- Feature branches following pattern: add_feature_name
- Detailed commit messages with scope and description
- Include 🤖 Generated with Claude Code footer in commits
- Run pre-commit hooks (Biome) and pre-push checks
- Create GitHub issues for major features

### Documentation
- Keep README.md updated with latest features
- Include installation options (GitHub template preferred over degit)
- Maintain acknowledgments section with all major dependencies
- Use --depth=1 for clone commands and advise rm .git

## File Structure Preferences
```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   │   ├── chat/stream/ # AI SDK streaming endpoint
│   │   └── sse/        # Traditional SSE endpoint
│   ├── chat/           # Chat interface page
│   ├── sse-demo/       # SSE testing interface
│   ├── layout.tsx      # Root layout with ThemeProvider
│   ├── page.tsx        # Landing page with navigation
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── chat/          # Chat interface components
│   ├── theme-provider.tsx
│   └── theme-switcher.tsx
├── lib/
│   ├── utils.ts       # cn utility for class merging
│   └── graphql.ts     # GraphQL integration
└── types/
    └── index.ts       # TypeScript type definitions

test/                  # Vitest tests
├── setup.ts          # Test configuration and mocks
└── *.test.tsx        # Component tests
```

## Common Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Check code quality
- `pnpm lint:fix` - Fix linting issues
- `pnpm test` - Run tests
- `pnpm test:ui` - Interactive test UI

## Project-Specific Notes

### Application Architecture
- Landing page with navigation to chat and SSE demo interfaces
- Dual endpoint approach: AI SDK streaming + traditional SSE
- GraphQL integration for real order data from staging API
- OpenAI function calling for intelligent order lookup

### API Endpoints
- `/api/chat/stream` - AI SDK streaming for React chat interface
- `/api/sse` - Traditional SSE with optional API key authentication
- SSE endpoint supports `x-api-key` header for external integrations
- Both endpoints use same OpenAI model and order lookup tools

### Security Features
- Optional SSE API key authentication via environment variable
- Security warnings in demo interface about client-side key exposure
- Production recommendations for server-side authentication

### Environment Variables
- `OPENAI_API_KEY` - Required for AI functionality
- `GRAPHQL_ENDPOINT` - Optional, defaults to staging API
- `SSE_API_KEY` - Optional, enables API key auth for SSE endpoint

### Testing & Quality
- All components tested with Vitest and React Testing Library
- Comprehensive test coverage for chat interface and API routes
- Browser API mocks for JSDOM compatibility (scrollIntoView, etc.)
- Biome linting with automatic fixes