# Roadmap

Planned work for the `v2` version of wilsonswires.com. Edit freely.

## Important

- [ ] **Make the New Client page findable.** `/new-client` is live but nothing links to it. It needs a place in the navbar or on the home and contact pages before customers can use it. The navbar already wraps at phone width with three links, so adding a fourth needs a layout decision.

## Planned features

Everything here should work well on a phone. The admin side in particular is meant to be run from the field.

### Work orders

- [ ] Work order form, separate from the New Client form.
- [ ] Submitting the New Client form leads straight into the work order form, already linked to the new client.
- [ ] Work order statuses: request, appointment scheduled, invoice sent, payment received, and others still to be decided.
- [ ] Clients can create work orders. Most updates and changes to a work order, including its status, happen on the admin side.

### `/admin` (my dashboard)

- [ ] Login with my email address and a password. Only I can get in.
- [ ] Client search bar at the top: substring search across first name, last name, email, company name and street address, for all clients, verified or not.
- [ ] Card display of currently active work orders, featured prominently.
- [ ] Quick status updates on a work order from a phone.

### `/client` (returning customers)

- [ ] A very simple page where clients find their own account by email address and can start a new work order linked to it.
- [ ] No password, so no sensitive data is shown on the page. Invoices and receipts are only available through a "Send me this in an email" button, which emails the list to the address on file.

### Import existing clients

- [ ] Populate the clients table from my existing client list:
  - [ ] Clients in the spreadsheet created by the New Client Info Google Form.
  - [ ] Older clients from before that form, who currently exist only as folders in the Clients folder in Google Drive.

## Setup before launch

- [ ] Connect a production Postgres database to the Vercel project and run `pnpm db:migrate`.
- [ ] Verify wilsonswires.com with the email provider and add the email variables in Vercel (see `.env.example`).
- [ ] Bring `main` up to the current Next.js version; new deploys from `main` are blocked until then.

## Open questions

- Should one email address be allowed both a personal and a business account? Today it is one account per email.
- Rate limiting for the public forms. Today there is a hidden spam-trap field only.
- Should the contact form move off Formspree and onto the site's own database and email?
- **Revisit:** On `/client`, could invoice and payment amounts just be shown on the page to anyone who knows the email address, instead of only by email?
- What is the full list of work order statuses, and which count as "active" for the admin cards?
- Where do invoices and payments live in the database? Today they're in Google Docs and my bookkeeping sheets, and both the emailed receipt list and the status of a work order depend on that.
- Importing the older Drive-folder clients: how much detail can be pulled from each folder, and how should folders that don't match a form entry be handled?
