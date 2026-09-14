# Project: Shiftly — Shift Scheduling App

## What this app does
A manager assigns employees to shifts (date + time slot + role/location).
Employees can view their own upcoming shifts. Managers can create, edit,
and delete shifts, and see the full schedule across all staff.

## Users & roles
- Manager: full access — create/edit/delete shifts, view all employees,
  manage employee list. Single shared manager login (see Auth below).
- Employee: read-only — can view their own shifts only. No login/account
  in the MVP (see Auth below).
- Time-off requests, shift swaps, and claiming open shifts are NOT part
  of the MVP — future scope only, see "Core features" below.

## Core features (MVP — build in this order)
1. Employee list (add/edit/remove employees, basic info)
2. Shift creation (assign employee + date + start/end time)
3. Weekly/monthly calendar view of the schedule
4. Employee-facing view of "my shifts"
5. Later (do not build yet, just keep in mind as future scope): shift
   swap requests, time-off requests, notifications, conflict detection
   beyond double-booking

## Tech stack
- Frontend: Plain HTML + JS (no frontend framework, no build step)
- Backend: Minimal Vercel serverless API routes (Node.js) — thin request
  handlers only, no Express or other backend framework
- Database: Hosted SQLite via Turso (libSQL) — chosen because Vercel
  serverless functions have no persistent filesystem, so a local SQLite
  file can't be used directly; Turso gives SQLite semantics with a
  connection Vercel functions can reach
- Auth: Single shared manager login (e.g. one manager password/account).
  Employees have no accounts and no login — they view schedules via a
  shared/public read-only view (e.g. a link, filtered by name)
- Hosting target: Vercel

## Data model (rough shape, adjust as needed)
- Employee: id, name, role, contact info
- Shift: id, employee_id, date, start_time, end_time, location/role
- No separate roles/users table needed for MVP — manager access is a
  single shared credential, not a per-user account system

## Rules / constraints
- Prevent double-booking: an employee can't have two overlapping shifts
- Labor rules (max hours/week, required breaks, minimum rest between
  shifts): none defined yet for the MVP — add here if/when they apply
- Time zone handling: single location — treat all times as local/naive,
  no timezone conversion logic needed

## What NOT to do
- Don't add authentication complexity beyond the single shared manager
  login — no per-employee accounts, no OAuth, no session/roles system
- Don't build shift-swap, time-off, or notification features until core
  scheduling (items 1–4 above) works
- Don't introduce a backend framework (Express, etc.) — keep API routes
  as minimal Vercel serverless functions
- Don't add multi-location or timezone-conversion logic — single
  location only for now
- Don't over-engineer the database for scale we don't need yet

## Conventions
- Keep serverless API routes under `/api`, one file per route, thin
  (just DB read/write + validation) — no framework layers
- Keep frontend as static files (plain HTML/CSS/JS) served directly by
  Vercel, no bundler/build step

## Marketing / promo site
- Lives in `/marketing`, separate from the app itself — plain static
  HTML/CSS (no framework, no build step), deployed on Vercel alongside
  the app
- Scope: single scrolling landing page — hero pitch, feature highlights
  (from "Core features" above), call-to-action. Not a multi-page site.
- Since the app has no public self-serve signup (single shared manager
  login), the CTA points to a contact method, not an account signup —
  update this once a real signup/demo flow exists
- Don't let marketing copy get ahead of built features — only promote
  what's listed under "Core features" as MVP scope
