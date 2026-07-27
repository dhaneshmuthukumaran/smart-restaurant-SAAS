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

