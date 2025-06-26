# Claude Code Project Memory

This file contains project-specific preferences and context for Claude Code sessions.

## Project Overview
- **Name**: Degu IO Boilerplate
- **Type**: Next.js boilerplate with modern tooling
- **Repository**: https://github.com/degu-io/nextjs-biome-boilerplate

## Tech Stack
- **Framework**: Next.js 15 with React 19
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
│   ├── layout.tsx      # Root layout with ThemeProvider
│   ├── page.tsx        # Home page (client component)
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── theme-provider.tsx
│   └── theme-switcher.tsx
└── lib/
    └── utils.ts       # cn utility for class merging

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
- Home page uses useRef for smooth scrolling to sections
- Theme switcher positioned top-right on mobile
- All external links open in new tabs with proper rel attributes
- GitHub repository link in Learn More button
- Mobile-optimized responsive breakpoints: sm, lg
- Maximum viewport scale set to 5 (changed from 1)
- All shadcn/ui components cleaned up - only using necessary ones