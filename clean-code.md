# DTR Clean Code and Structure Guide

This guide is a practical reference for keeping the DTR app organized as it grows. It is based on the current project shape: a pnpm workspace with a Next.js web app now, a mobile app later, and shared packages for code that both clients can reuse.

## Current Project Shape

```txt
dtr-app/
  apps/
    web-dtr/              Next.js web app
      app/                Routes and layouts
      components/         Web UI components grouped by feature
      components/ui/      Reusable base UI components
      lib/                Web-only helpers
      public/             Static assets
    mobile-dtr/           Future mobile app
  packages/
    shared/               Shared clients, types, schemas, helpers
```

The current direction is good:

- Root `package.json` owns workspace scripts.
- `apps/web-dtr/app/*/page.tsx` files are thin route entry points.
- Feature components live in `components/auth` and `components/home`.
- Shared Supabase setup has started in `packages/shared`.

The main thing to protect as the app grows is separation of responsibility. Each file should have one clear job.

## Mental Model

Think of the app in layers:

```txt
Route
  -> Page component
    -> Feature components
      -> UI components
        -> Hooks / services / shared helpers
          -> Supabase / external APIs
```

Good code usually flows down this stack. Avoid having every component directly know about routing, auth, database details, and UI layout all at once.

## Recommended Folder Rules

### `apps/web-dtr/app`

Use this for routing only.

Good:

```tsx
import { AuthPage } from "@/components/auth/auth-page";

export default function Page() {
  return <AuthPage />;
}
```

Avoid putting large forms, API calls, and business rules directly inside `page.tsx`. Route files become hard to scan when they do everything.

### `apps/web-dtr/components/<feature>`

Use this for feature-specific UI and logic.

Examples:

```txt
components/
  auth/
    auth-page.tsx
    auth-shell.tsx
    auth-form.tsx
    auth-mode-toggle.tsx
    use-auth-session.ts
  dashboard/
    dashboard-page.tsx
    dashboard-header.tsx
    attendance-actions.tsx
```

A feature component can know about the feature. For example, `auth-form.tsx` can know about sign in and sign up. A base button should not.

### `apps/web-dtr/components/ui`

Use this for reusable, generic UI pieces.

Good examples:

- `button.tsx`
- `input.tsx`
- `dialog.tsx`
- `badge.tsx`
- `empty-state.tsx`

Rules:

- Do not put business words here, like employee, attendance, payroll, or admin.
- Keep these components reusable across many screens.
- Prefer props such as `variant`, `size`, and `disabled` over feature-specific props.

### `apps/web-dtr/lib`

Use this for helpers that only the web app needs.

Examples:

- class name helpers
- web-only formatting helpers
- browser-only utilities
- Next.js-specific helpers

If mobile will need the same code later, consider `packages/shared` instead.

### `packages/shared`

Use this for code that can be safely shared by web and mobile.

Good candidates:

- TypeScript types
- Zod schemas
- Supabase client helpers
- attendance validation rules
- date/time helpers
- constants

Avoid putting React web components here unless they are truly cross-platform safe.

## File Naming

Use simple kebab-case file names:

```txt
auth-form.tsx
auth-page.tsx
attendance-actions.tsx
use-auth-session.ts
```

Use PascalCase for component names:

```tsx
export function AuthForm() {}
export function AttendanceActions() {}
```

Use camelCase for functions and variables:

```ts
const nextSession = session;
function getSupabaseBrowserClient() {}
```

Use domain words consistently:

- `auth`
- `employee`
- `admin`
- `attendance`
- `dashboard`
- `reports`
- `profile`

Avoid changing between words such as `user`, `member`, `staff`, and `employee` unless they mean different things.

## Component Guidelines

### Keep Components Focused

A component should usually do one of these jobs:

- layout
- form state
- data loading
- display
- user action

For example:

```txt
auth-page.tsx        Handles auth page behavior
auth-shell.tsx       Handles auth page layout
auth-form.tsx        Handles email/password form
auth-mode-toggle.tsx Handles sign-in/sign-up toggle
```

This is cleaner than one huge `AuthPage` containing everything.

### Split When a File Gets Too Busy

Split a component when:

- it is hard to name what the file does in one sentence
- it has multiple unrelated state groups
- it mixes loading data, rendering layout, and handling many actions
- it has repeated UI blocks
- it is over roughly 150 to 200 lines and still growing

Do not split only because a file is slightly long. Split when the new pieces have clear names.

### Prefer Props Over Hidden Coupling

Good:

```tsx
<HomeAction href={actionHref} label={actionLabel} loading={loading} />
```

Less clean:

```tsx
<HomeAction />
```

where `HomeAction` secretly reads session, router, and auth state by itself.

Props make components easier to reuse and test.

## Hooks Guidelines

Hooks are good for reusable client-side behavior.

Current example:

```txt
components/auth/use-auth-session.ts
```

Use hooks for:

- session state
- browser subscriptions
- repeated form behavior
- client-only side effects

Avoid duplicating hook logic in pages. For example, if dashboard and auth both need session state, use the same `useAuthSession` hook instead of copying Supabase session code.

## Supabase Guidelines

Keep Supabase setup centralized.

Current shared entry:

```txt
packages/shared/supabase/client.ts
```

Good:

```ts
const supabase = getSupabaseBrowserClient();
```

Avoid creating Supabase clients directly inside every component. That makes future changes harder, especially when you add server-side auth, admin roles, or mobile support.

As the app grows, consider this structure:

```txt
packages/shared/
  supabase/
    client.ts
  auth/
    types.ts
  attendance/
    types.ts
    schema.ts
    rules.ts
```

## TypeScript Guidelines

Prefer explicit types for important app data.

Good:

```ts
type AuthMode = "signIn" | "signUp";

type FormState = {
  email: string;
  password: string;
};
```

Use types to protect domain logic:

```ts
type AttendanceStatus = "notStarted" | "timedIn" | "timedOut";
type UserRole = "employee" | "admin";
```

Avoid using `any`. If the data shape is unknown, use `unknown` and narrow it.

## State Guidelines

Keep state close to where it is used.

Good local state:

- input text
- loading flag
- open/closed toggle
- temporary success/error message

Move state into a hook when:

- more than one component needs it
- it has side effects
- it talks to Supabase
- it has repeated loading/error handling

## Error Handling

Show useful errors to users, but keep the messages simple.

Good:

```ts
setError(signInError.message);
```

For unexpected errors:

```ts
setError(
  error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.",
);
```

For future production code, avoid exposing sensitive server or database details directly to users.

## Styling Guidelines

The app currently uses Tailwind CSS and reusable UI components.

Rules:

- Use `components/ui` for shared controls.
- Keep feature-specific styling inside feature components.
- Use `cn()` when combining conditional class names.
- Avoid repeating long class strings in many places.
- If a style pattern repeats 3 or more times, consider a component.

Example:

```tsx
className={cn(
  "h-12 w-full rounded-2xl border px-4",
  error ? "border-rose-400" : "border-white/10",
)}
```

## Clean Code Checklist

Before finishing a feature, ask:

- Can I explain each file's purpose in one sentence?
- Are route files thin?
- Is duplicated logic moved into a hook or helper?
- Are feature components inside the correct feature folder?
- Are generic components free of business-specific words?
- Are Supabase calls centralized where practical?
- Are important data shapes typed?
- Are loading, empty, success, and error states handled?
- Did I avoid unrelated refactors?
- Does `pnpm lint` pass?

## Suggested Next Refactors

These are not urgent, but they are good learning exercises.

### 1. Split the dashboard page

Current `app/dashboard/page.tsx` contains session loading, redirect logic, sign out behavior, layout, cards, and actions.

Recommended future shape:

```txt
components/dashboard/
  dashboard-page.tsx
  dashboard-shell.tsx
  dashboard-header.tsx
  dashboard-summary-cards.tsx
  attendance-actions.tsx
  dashboard-next-steps.tsx
```

Then keep the route thin:

```tsx
import { DashboardPage } from "@/components/dashboard/dashboard-page";

export default function Page() {
  return <DashboardPage />;
}
```

### 2. Reuse `useAuthSession`

The dashboard currently has session-checking code similar to the auth flow. Move shared session behavior into `useAuthSession`, then let dashboard focus on dashboard behavior.

### 3. Add shared domain types

Create shared types before the attendance feature grows:

```txt
packages/shared/attendance/types.ts
packages/shared/auth/types.ts
```

Example:

```ts
export type UserRole = "employee" | "admin";

export type AttendanceRecord = {
  id: string;
  employeeId: string;
  timeIn: string;
  timeOut: string | null;
  status: "timedIn" | "timedOut";
};
```

### 4. Add validation schemas

When forms and database writes become more serious, add schemas:

```txt
packages/shared/attendance/schema.ts
```

Use them before writing to Supabase.

## Feature Workflow

When adding a new feature, use this order:

1. Define the domain words.
2. Add or update shared types.
3. Create the route.
4. Create a feature page component.
5. Split layout, form, cards, and actions into smaller components.
6. Move repeated logic into hooks.
7. Add loading, empty, success, and error states.
8. Run lint/build.

Example for attendance:

```txt
app/attendance/page.tsx
components/attendance/attendance-page.tsx
components/attendance/attendance-actions.tsx
components/attendance/attendance-history.tsx
components/attendance/use-attendance.ts
packages/shared/attendance/types.ts
packages/shared/attendance/schema.ts
```

## Simple Rule To Remember

If the code describes what the user sees, it belongs in a component.

If the code describes reusable behavior, it belongs in a hook or helper.

If the code describes business rules or shared data shapes, it belongs in `packages/shared`.

If the file is a route, keep it boring and small.
