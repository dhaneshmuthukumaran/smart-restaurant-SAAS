<<<<<<< HEAD
# Smart Restaurant SAAS

This repository contains the merged Smart Restaurant application combining the customer-facing app, staff frontend, and backend mock server.

## Overview

This app includes:
- Customer-facing frontend built with React and Vite
- Staff-facing frontend module from FloorOps
- Mock Express backend for image generation and restaurant data

## Run locally

### Backend
```bash
cd behindend
npm install
npm start
```

### Customer frontend
```bash
cd frontend/commonfrontend/cusstomerfrontend
npm install
npm run dev
```

### Backend health
- `http://localhost:4000/api/health`

## Notes
- The project now merges customer and staff frontend functionality with backend support.
- Resolve any further conflicts manually if branch-specific assets or configs diverge.

# FloorOps — Staff Frontend

Staff-side console for the Smart Restaurant Management System (VibeAthon 6.0). Built as a standalone React frontend running on **mock data** — no backend required to demo it. Every context function is written so swapping to real MERN API calls later is a drop-in replacement.

## Tech stack
- React 18 + Vite
- React Router v6
- Tailwind CSS v4
- lucide-react icons
- State: React Context + localStorage (stands in for a backend + DB until wired up)

## Run it
```bash
npm install
npm run dev
```
Open the printed local URL. Log in with:
- **Sign in:** `ananya@floorops.test` / `password` (also karthik@, divya@, suresh@ — same password), then any 4-digit OTP
- **Google** button is a stubbed OAuth (matches by email, or auto-creates an account) — swap `loginWithGoogle` in `src/context/AppContext.jsx` for a real OAuth flow.
- **Sign up:** anyone can create a new staff account from the "Sign up" tab on the login screen (name, email, role, password), or a Shift Manager can add teammates from Profile → Staff directory. New accounts can sign in immediately — the staff list is live state (persisted to `localStorage`), not a hardcoded array, so it grows as people join. There is no PIN login; only email/password and Google.

## Features covered
| Area | Where |
|---|---|
| Staff sign in / sign up (email/password + OTP, Google OAuth) | `pages/Login.jsx` |
| Shift clock-in / clock-out | `TopBar.jsx`, `pages/Profile.jsx` |
| Order creation & editing (dine-in / takeaway / delivery) | `components/OrderFormModal.jsx` |
| Table selection & floor plan | `pages/FloorPlan.jsx` |
| Kitchen Display System (New → Cooking → Ready) | `pages/KDS.jsx` |
| Bill generation, split bills, discounts, payment | `components/BillModal.jsx`, `pages/Billing.jsx` |
| Order cancellation & modification | `components/CancelOrderModal.jsx`, `pages/Orders.jsx` |
| Order history & search | `pages/OrderHistory.jsx` |
| Staff alerts & notifications | `pages/Notifications.jsx`, inventory alerts on `pages/Dashboard.jsx` |
| Dashboard overview | `pages/Dashboard.jsx` |
| Profile / settings | `pages/Profile.jsx` |
| Search & filtering | Top bar search on Orders, Floor Plan, KDS, Billing, History |

## Design direction
Dark, high-contrast "kitchen ticket" theme — real KDS screens run dark to cut glare under kitchen lighting. Orders, kitchen tickets, and bills all use a shared `.ticket` component styled like a torn order chit (perforated top edge, colored status corner), with Oswald for headers, Inter for body text, and IBM Plex Mono for order IDs, prices, and timestamps — mimicking a receipt printer.

## Wiring up the real backend
Everything data-related lives in `src/context/AppContext.jsx` and `src/data/mockData.js`. To connect it to your Node/Express + MongoDB (or Postgres/Supabase) backend:
1. Replace the `STAFF`/`MENU`/`TABLES`/orders arrays in `mockData.js` with `fetch`/axios calls.
2. Replace `loginWithPassword`, `registerStaff`, `loginWithGoogle` with real auth endpoint calls (JWT/session + real OTP + real Google OAuth redirect, plus real password hashing on signup).
3. Replace the `useState` + `localStorage` pattern in `AppContext.jsx` with API calls in each action (`createOrder`, `updateOrderStatus`, etc.), and consider React Query/SWR for caching and real-time refresh.
4. For live kitchen/table updates across devices, add a WebSocket or polling layer so the KDS and floor plan update in real time across multiple staff devices.

## Notes for your submission
This repo only covers the **staff-facing frontend** — pair it with your team's customer-facing app and backend for the full submission.
>>>>>>> origin/main
