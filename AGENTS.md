# AGENTS.md

## Build/Lint/Test Commands

- `npm run start:dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (Next.js core-web-vitals config)
- `npm run codegen` - Generate GraphQL types from schema

## Code Style Guidelines

- **TypeScript**: Strict mode enabled, use proper typing
- **Imports**: Use `@/` path alias for root imports (e.g., `@/apollo`, `@/components`)
- **Components**: Default export with PascalCase naming, functional components with TypeScript
- **Hooks**: Custom hooks in `hooks/` directory, use `use` prefix
- **GraphQL**: Use Apollo Client with generated types from `gql/` directory
- **State**: Apollo reactive variables for global state (`authTokenVar`, `isLoggedInVar`)
- **Styling**: Tailwind CSS classes, avoid inline styles`
- **Constants**: Export from `common/constants.ts` in SCREAMING_SNAKE_CASE
- **Error Handling**: Check for specific error messages (e.g., "Token has expired")
- **SSR Safety**: Use `typeof window !== "undefined"` checks for client-side only code
- **Comments**: English comments for business logic, English for technical details
- **File Structure**: Pages in `pages/`, components in `components/`, organized by feature

## Github Commit Message Guidelines

- **Language**: Use English
- **Type**: Use `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Scope**: Use `auth`, `post`, `comment`, `category`, `user`, `common`
- **Rules**: One file per commit, one commit per feature, one commit one date, increasing day by day
- **Example**: example1.tsx - 2024.01.01, example2.tsx - 2024.01.02
- **Other**: Don't use Contributors Name
