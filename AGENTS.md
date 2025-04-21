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
- **Rules**: When committing multiple files:
- Create a separate commit for each file
- Use the date I specify as the starting point
- Increment the commit date by exactly one day for each subsequent file
- Use --date "{date} 10:00:00 KST" to set the commit date
- Apply this to commit date
- Set commit date to the date I provide. If no date is given, use 1 week before current date.
- **Other**: Don't use Contributors Name
