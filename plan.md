# Frontend Development Plan — Service Booking Platform

**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui
**Backend API:** https://service-booking-backend-inhk.onrender.com
**Backend Repo:** https://github.com/tanzid-48/service-booking-backend

---

## Design System

| Element       | Decision                                                                |
| ------------- | ----------------------------------------------------------------------- |
| Primary color | Teal (trust, service)                                                   |
| Accent color  | Coral (CTA buttons, highlights)                                         |
| Neutral       | Gray (text, backgrounds, borders)                                       |
| Font          | Inter (shadcn default)                                                  |
| Components    | shadcn/ui — card-based, rounded corners, subtle shadow                  |
| Layout        | Navbar (changes based on role) + Sidebar (in Provider/Admin dashboards) |

## Sitemap

```
Public
├── Home (hero + categories + featured services)
├── Services list (search + category filter)
├── Service details (info + reviews)
└── Login / Register

Customer (login required)
├── Book a service
├── My bookings (with status badge)
└── Leave a review

Provider (login + role=PROVIDER required)
├── My services (create/edit/delete)
└── Booking requests (status update)

Admin (login + role=ADMIN required)
├── Manage users (soft delete)
└── Manage categories (CRUD)
```

Role lives inside the JWT token; a middleware/route guard decides which sections a logged-in user can access.

---

## Phase-by-Phase Work Order

### Phase 1 — Project Setup

- [ ] `npx create-next-app` (TypeScript, Tailwind, App Router)
- [ ] Initialize shadcn/ui + add initial components (Button, Card, Input, Badge)
- [ ] Customize `globals.css` color variables (`:root` and `.dark`) to teal/coral theme
- [ ] Install `next-themes` and add a dark/light mode toggle (used in Navbar, built in Phase 2)
- [ ] Set up folder structure (`app/`, `components/`, `lib/`, `types/`)
- [ ] Create API base URL + fetch helper (`lib/api.ts`)
- [ ] Set `NEXT_PUBLIC_API_URL` in `.env.local`
- [ ] Build AuthContext (token + user state, stored in localStorage)

**Verify:** dev server runs, a placeholder home page renders.

---

### Phase 2 — Authentication

- [ ] Register page (`/register`) — form + API call
- [ ] Login page (`/login`) — form + token storage + redirect
- [ ] Navbar — changes based on login state (Login/Register vs. User menu)
- [ ] Route protection (per Customer/Provider/Admin)
- [ ] Logout function

**Verify:** Register → Login → token is stored, redirect to protected pages works.

---

### Phase 3 — Public Pages

- [ ] Home page — hero + category grid + featured services
- [ ] Services list page (`/services`) — category filter, card grid
- [ ] Service details page (`/services/[id]`) — info + provider + reviews list

**Verify:** Real category/service data from the backend is visible, filtering works.

---

### Phase 4 — Customer Features

- [ ] Booking form (from the service details page, logged-in customers only)
- [ ] My Bookings page (`/my-bookings`) — status badges (different colors for PENDING/CONFIRMED/COMPLETED/CANCELLED)
- [ ] Review form (rating + comment, for customers with a booking)

**Verify:** Logged in as a Customer, a booking can be created and appears in the list.

---

### Phase 5 — Provider Dashboard

- [ ] `/dashboard/services` — own service list (table/card)
- [ ] Service Create/Edit form, Delete button (soft delete)
- [ ] `/dashboard/bookings` — booking requests, status-change buttons (Confirm/Complete/Cancel)

**Verify:** Logged in as a Provider, a service can be created and booking status can be changed.

---

### Phase 6 — Admin Dashboard

- [ ] `/admin/users` — full user list, soft-delete toggle
- [ ] `/admin/categories` — Category CRUD (create/edit/delete)

**Verify:** Logged in as Admin, users/categories can be managed.

---

### Phase 7 — Polish & Deploy

- [ ] Loading states on all pages (skeleton/spinner)
- [ ] Error handling on all pages (toast/message)
- [ ] Responsive design check (mobile/tablet)
- [ ] Deploy to Vercel
- [ ] Add frontend URL to backend CORS (if needed)
- [ ] Update README — frontend + backend integration notes

---

## Working Rules

- After each Phase, **run and test it** before moving to the next Phase (same approach used for the backend)
- **Commit + push to GitHub** after each Phase
- The frontend will always use the deployed backend URL (`https://service-booking-backend-inhk.onrender.com`), not the local backend — so it always stays in sync with live data
