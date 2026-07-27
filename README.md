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

## FloorOps — Staff Frontend

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

## Notes for submission
This repo includes both the customer-facing app and staff frontend modules. Use this README as the base reference and update deployment details as needed.
