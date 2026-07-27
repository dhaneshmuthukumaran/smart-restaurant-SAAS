# The Kitchen Line — Common Frontend (Entry Gateway)

This is the **entry point** of the website. It shows three options —
**Customer**, **Staff**, and **Admin** — and routes to whichever page
your teammates have built for each role.

## How to use

1. Open `index.html` in a browser (just double-click it — no install needed).
2. Before deploying, edit the three URLs in `index.html`, inside the
   `<script>` tag near the bottom:

   ```js
   const LINKS = {
     customer: "http://localhost:3000/customer",
     staff:    "http://localhost:3001",
     admin:    "http://localhost:3002",
   };
   ```

   Replace each with wherever that teammate's page actually lives:
   - A relative path if it's a folder next to this one (e.g. `"../staff/index.html"`)
   - A local port if it runs as a separate dev server (e.g. `"http://localhost:3001"`)
   - A live URL once deployed (e.g. `"https://kitchenline-staff.vercel.app"`)

3. Save, refresh the page, and the three cards will link to the right place.

## Files
- `index.html` — the page structure and the 3 links to edit
- `style.css` — all styling (matches the restaurant's kraft-paper/ticket brand)

## Deploying
This is a plain static page, no build step. You can:
- Drop it into any static host (Vercel, Netlify, GitHub Pages)
- Or place it at the root of your combined project so `/` on your domain
  shows this page first, before visitors pick a role.
