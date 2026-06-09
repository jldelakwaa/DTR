# DTR App Structure

This repo should be treated as one product with two clients:
- web now
- mobile later

The goal is to share business rules, types, and database logic as much as possible.

## Recommended repo layout

```txt
dtr-app/
  .gitignore
  package.json
  pnpm-lock.yaml
  pnpm-workspace.yaml
  setup.md
  structure.md
  apps/
    web-dtr/
      app/
      public/
      components/
      lib/
    mobile-dtr/
      app/
      assets/
      components/
      lib/
  packages/
    shared/
    db/
    ui/
    config/
```

## What each area should contain

### `apps/web-dtr`

The Next.js app for:
- employee login
- time in and time out
- attendance history
- admin dashboard
- reports and exports
- browser GPS capture
- WebAuthn login

Suggested route groups:
- `(auth)` for login and password flows
- `(employee)` for employee-facing screens
- `(admin)` for admin-only screens

### `apps/mobile-dtr`

The Expo app for:
- quick attendance actions
- push notifications
- QR scanning
- camera capture
- offline support

Suggested route groups:
- `(auth)`
- `(tabs)`
- `attendance`
- `settings`

### `packages/shared`

Shared code that both apps can use:
- TypeScript types
- Zod schemas
- date helpers
- validation rules
- constants

### `packages/db`

Database-related code:
- schema definitions
- migrations
- seed data
- DB client setup
- role and permission helpers

### `packages/ui`

Reusable UI pieces that make sense across platforms:
- buttons
- inputs
- cards
- status badges
- empty states

Keep this package small and only share components that do not depend too much on platform-specific APIs.

### `packages/config`

Shared config for:
- ESLint
- TypeScript
- formatting
- environment validation

## Naming conventions

- Use `employee`, `admin`, `attendance`, `reports`, and `auth` as your core domain words.
- Keep route names and database names aligned when possible.
- Prefer simple feature names over clever abbreviations.

## Data flow

1. UI calls a server action, route handler, or API layer
2. Server code validates the request
3. Server code talks to the database
4. Shared types keep both apps consistent

## Security boundaries

- Admin actions should never rely only on client-side hiding.
- Attendance writes should be validated on the server.
- Sensitive queries should be protected by database policies.
- Mobile and web should both consume the same backend rules.

## Practical rule

If code can be shared cleanly, put it in a package.
If code is platform-specific, keep it inside the app that owns it.
