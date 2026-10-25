# Roadmap

Planned work for the `v2` version of wilsonswires.com. Edit freely.

## Important

- [ ] **Make the New Client page findable.** `/new-client` is live but nothing links to it. It needs a place in the navbar or on the home and contact pages before customers can use it. The navbar already wraps at phone width with three links, so adding a fourth needs a layout decision.

## Planned features

- [ ] Work order form, separate from the New Client form.
- [ ] Client lookup for the admin: substring search across all clients, verified or not, behind a login.
- [ ] Client lookup for returning customers: find their existing account by an exact match and create a new work order linked to it.

## Setup before launch

- [ ] Connect a production Postgres database to the Vercel project and run `pnpm db:migrate`.
- [ ] Verify wilsonswires.com with the email provider and add the email variables in Vercel (see `.env.example`).
- [ ] Bring `main` up to the current Next.js version; new deploys from `main` are blocked until then.

## Open questions

- Should one email address be allowed both a personal and a business account? Today it is one account per email.
- Rate limiting for the public forms. Today there is a hidden spam-trap field only.
- Should the contact form move off Formspree and onto the site's own database and email?
