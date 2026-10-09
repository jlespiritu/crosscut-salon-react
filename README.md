# CrossCut Salon: Website

Public website for CrossCut Salon (Caloocan City) with a live, abuse-protected booking form.

**Live site:** https://crosscut-salon.vercel.app
**Part of:** CrossCut Salon system (see also the [backend](https://github.com/jlespiritu/crosscut-salon-backend))

## Features

- Pages: Home, Services, Staff, Booking, Contact
- Four-step booking form with available time slots and a reference ID per request
- Responsive layout with a mobile menu
- Luxury light and gold design system: Button, Card, Badge, Input, with brand tokens

**Accessibility:** skip link, ARIA labels, `aria-current`, `aria-live`, label/id pairing.
**Performance:** lazy-loaded images, high-priority hero image, compressed logo.

## Booking pipeline

The form posts to a Google Apps Script web app that writes to a dedicated Google Sheet and emails the owner. It is free, isolated from the POS, and protected by:

- honeypot field and minimum time before submit
- per-phone and global rate limits
- `LockService` to stop double booking
- slot capacity and date window checks
- formula-injection sanitising
- email retry every 15 minutes

## Tech stack

React 18, Vite, Tailwind CSS v3, React Router v6, deployed on Vercel.

## Getting started

Requires Node.js 20+ and npm.

```bash
git clone https://github.com/jlespiritu/crosscut-salon-react.git
cd crosscut-salon-react
npm install
npm run dev
```

Opens at `http://localhost:5173`. The booking endpoint and contact phone are set in `src/config.js`.

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/     design system components
├── pages/          Home, Services, Staff, Booking, Contact
├── data/           services and staff data
├── config.js       booking endpoint and contact settings
└── App.jsx         routes
vercel.json         SPA rewrite so direct links like /staff work
tailwind.config.js  brand tokens (gold, blush, rose)
```

## Problems solved

| Problem | Cause | Solution |
|---|---|---|
| Site depended on `localhost:3000` | Backend was not hosted | Booking moved to Apps Script plus Google Sheets, services and staff served from local data |
| `/staff` failed when opened directly | Single-page app needs a rewrite | Added `vercel.json` SPA rewrite |
| "No staff" shown on the page | Missing route hidden by silent fallback | Restored the route, made errors visible |
| Vercel build failed on a renamed file | Git on Windows ignores case-only renames | Two-step `git mv` |
| Styling broke | A tool rewrote Tailwind v3 syntax to v4 | Restored v3 and banned automated code rewriting tools |
| Page turned blank after an edit | Another tool duplicated and truncated code in `App.jsx` and `BookingPage.jsx` | Recovered with `git checkout` from the last clean commit |
| Dark and pink look | Leftover template styles | Rewrote to the consistent light and gold design |
| Wrong dependency in `package.json` | `mongoose` installed in the website repo | Removed it |
| Confusing errors | Unsaved files in the editor | Save-before-run habit |

## Roadmap

- [ ] Replace the placeholder contact phone in `src/config.js`
- [ ] Services read from the backend API
- [ ] SEO: meta tags, sitemap, structured data
- [ ] Full accessibility audit
- [ ] Custom domain

## Author

**Jeffrey L. Espiritu**, [@jlespiritu](https://github.com/jlespiritu)
