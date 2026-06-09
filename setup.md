# DTR App Setup

This project is now set up as a pnpm monorepo with:
- `web-dtr` for the Next.js web app
- `mobile-dtr` for the future React Native + Expo app
- shared code in packages later, if needed

## Recommended stack

- Frontend web: Next.js
- Mobile: React Native + Expo
- Database: Supabase first, unless you specifically want to manage auth and storage separately

## Why Supabase first

Supabase is the fastest path for this kind of app because it gives you:
- Postgres
- Auth
- Storage
- Realtime
- Row Level Security

That fits a DTR system well because you will likely need:
- employee login
- admin access control
- attendance records
- reports and exports
- file or image handling later

Use Neon if you only want a Postgres database and prefer to build auth, storage, and access control around it yourself.

## Current product scope

### Web app

- Employee login
- Time in
- Time out
- Attendance history
- Admin dashboard
- Employee management
- Reports and exports
- GPS capture through the browser
- WebAuthn login for biometric-capable devices

### Mobile app

- Better mobile UX
- Push notifications
- QR scanning
- Camera workflows
- Offline support

## Suggested build order

1. Build the web app first
2. Set up the database schema and auth
3. Add admin workflows
4. Add attendance capture and history
5. Add exports and audit checks
6. Build the Expo mobile app after the core data model is stable

## Notes

- Keep business logic in shared modules or server-side code, not scattered across UI screens.
- Protect sensitive data with database policies and server-side checks.
- Keep employee and admin routes separated from the start so permissions stay clear.
- Keep `.env.example` committed in each app, and put real secrets in `.env.local` instead.
