# wilsonswires.com

Website for Wilson's Wires LLC, an electrical contractor in New Orleans, Louisiana.

## Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS
- pnpm
- Hosted on Vercel; the contact form posts to Formspree

## Layout

- `app/` - routes: `/` (home), `/services`, `/contact`
- `app/ui/` - shared components, fonts and CSS
- `public/images/` - site images

## Development

```
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` and fill in the values you need.

## Branches

- `main` - the live site
- `v2` - long-lived branch for the next version; changes land here through pull requests
