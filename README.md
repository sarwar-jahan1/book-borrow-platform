# The Reading Room — Online Book Borrowing Platform

A modern, responsive web app for digitally browsing and borrowing books, built for the
**category-A8-Mango** assignment. Users can explore a catalog of books, filter by category,
view details, and borrow titles once logged in. Styled as a digital card-catalog with a
warm ink/paper/brass palette instead of a generic template look.

## Live URL
`<add your deployed Vercel URL here after deploying>`

## GitHub Repo
`<add your GitHub repo URL here>`

## Key Features

- **Home page** — hero banner, scrolling marquee of new arrivals, featured books
  section, a "browse by shelf" category showcase, and a "how borrowing works" section.
- **All Books page** — live search by title plus a category sidebar (Story / Tech / Science)
  that filters the grid instantly.
- **Book Details page** (private route) — large cover, description, live stock count, and a
  "Borrow This Book" button that redirects logged-out users to Login and shows a success toast
  once borrowed.
- **Authentication** — email/password login & registration plus Google social login, powered
  by [Better Auth](https://better-auth.com) with a MongoDB adapter. Friendly toast/inline
  errors on failure.
- **My Profile page** (private route) — shows the signed-in user's info, with an
  **Update Information** flow (name + photo) using Better Auth's `updateUser` API.
- **Responsive layout** — mobile, tablet, and desktop breakpoints across every page, including
  a collapsible mobile nav menu.
- **Environment variables** — all secrets (Mongo URI, Better Auth secret, Google OAuth keys)
  are read from `.env.local` and never committed.

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- DaisyUI
- Better Auth (email/password + Google OAuth, MongoDB adapter)
- MongoDB

## npm Packages Used

| Package | Purpose |
|---|---|
| `next`, `react`, `react-dom` | Core framework |
| `tailwindcss`, `@tailwindcss/postcss` | Styling |
| `daisyui` | Component styling on top of Tailwind |
| `better-auth` | Authentication (email/password + Google social login) |
| `mongodb` | Database driver used by the Better Auth adapter |
| `react-hot-toast` | Toast notifications for login/register/borrow feedback |
| `swiper` | Carousel package (assignment's "implement one of Animate.css / React-Spring / Swiper" requirement — wire it into any section you'd like a carousel, e.g. Featured Books) |
| `lucide-react` | Icon set used across the navbar, footer, and forms |

## Getting Started Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment file and fill in real values:
   ```bash
   cp .env.example .env.local
   ```
   You'll need:
   - `MONGODB_URI` — a MongoDB Atlas (or local) connection string.
   - `BETTER_AUTH_SECRET` — any long random string (`openssl rand -base64 32`).
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — from the Google Cloud Console, with
     `http://localhost:3000/api/auth/callback/google` (and your production URL) added as an
     authorized redirect URI.
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## Deploying

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add the same environment variables from `.env.example` in the Vercel project settings
   (Production + Preview), using your real Mongo URI, Better Auth secret, your deployed
   `BETTER_AUTH_URL` / `NEXT_PUBLIC_BETTER_AUTH_URL`, and Google OAuth keys.
4. Add the production callback URL
   (`https://<your-domain>/api/auth/callback/google`) to your Google OAuth client.
5. Redeploy. Because this is a single Next.js app using the App Router (not a static SPA),
   reloading on any route (`/all-books`, `/books/1`, `/profile`, etc.) is handled correctly
   out of the box — no extra rewrite rules are needed.

## Project Structure

```
app/                  Routes (App Router)
  all-books/          All Books page (search + category filter)
  books/[id]/         Private book details page
  login/, register/   Auth pages
  profile/            Private profile + update-info pages
  api/auth/[...all]/  Better Auth route handler
  api/books/          Book data endpoints (served from data/books.json)
  api/borrow/         Borrow confirmation endpoint
components/           Navbar, Footer, BookCard, Hero, Marquee, sections, AuthGuard, etc.
lib/                  auth.js (server), auth-client.js (client), mongodb.js
data/books.json       Seed catalog of 12 books
```

## Notes for the Examiner

- Private routes (`/books/[id]`, `/profile`, `/profile/update`) redirect to `/login` when
  there's no active session.
- Email verification and "forgot password" were intentionally left out per the assignment brief.
- The `/api/borrow` route currently returns a confirmation message without mutating stock —
  swap in a MongoDB update against the `available_quantity` field if persistent borrow counts
  are required.
