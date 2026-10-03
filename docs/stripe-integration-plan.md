# Stripe integration plan — Golden Tide IT Professional Services

**Business:** [itsamoa.goldentide.cloud](https://itsamoa.goldentide.cloud/)  
**Products:** Payments, Invoicing  
**Stack:** Vite + React (Base44) frontend on Netlify; Stripe secret work in Netlify Functions  

> Generated with Stripe agent skills (`stripe-best-practices`) after the Cursor Stripe plugin / `stripe_implementation_planner` MCP tool were unavailable in this Cloud Agent session. Re-run the planner once MCP is authenticated for a live account review.

## Goals

1. **Payments** — Clients can pay published rate-card items (audit, hourly blocks, call-out) online via Stripe Checkout.
2. **Invoicing** — Staff (or a gated admin form) can create Stripe Invoices with 14-day terms matching the rate card, email the hosted invoice, and collect card (or other Dashboard-enabled methods).
3. Keep BSP Samoa bank details as an alternate WST settlement path (Stripe does not support WST country/currency today).

## Recommended architecture

| Concern | Choice | Why |
| --- | --- | --- |
| One-time card payments | **Checkout Sessions** (hosted full page) | Lowest maintenance; dynamic payment methods; PCI handled by Stripe |
| Billed engagements / Net-14 | **Invoicing API** (`invoiceitems` → `invoices` → finalize + send) | Matches professional-services AR; hosted invoice page; dunning later |
| Secret key location | **Netlify Functions** only | Never expose `sk_` / `rk_` to the Vite bundle |
| Publishable key | `VITE_STRIPE_PUBLISHABLE_KEY` | Optional client-side Elements later; Checkout redirect does not require it |
| API style | Instantiated `Stripe` client (Node SDK ≥ 22) | Avoid deprecated global `stripe.api_key` |
| Payment method types | **Omit** `payment_method_types` | Enable Dashboard dynamic payment methods |
| Webhooks | **Required** | Fulfill on `checkout.session.completed` + `checkout.session.async_payment_succeeded` and invoice paid events — not on the success page alone |
| Dev environment | Dedicated **sandbox** (claimable) | Isolate from live / shared test mode |
| Keys | Restricted / sandbox keys (`rk_` / `rkcs_`) | Prefer RAKs over full secret keys |

## Currency note (critical)

- Rate card is published in **WST**.
- Stripe country/currency support does **not** include Samoa (`WS`) / WST for this account path.
- Card checkout and Stripe invoices use **USD** at the **same numeric amounts** as the WST rate card until FX mapping is defined.
- Copy on `/pay` and invoices must disclose this. BSP transfer remains available for true WST settlement.

## Catalog

SKUs (server allowlist in `netlify/functions/lib/catalog.mjs`):

| SKU | Service | Amount (cents) | Unit |
| --- | --- | --- | --- |
| `everyday-it` | Everyday IT support | 10000 | per hour |
| `consulting` | Consulting | 15000 | per hour |
| `specialised` | Specialised project work | 20000 | per hour |
| `audit` | Complete system audit | 50000 | flat |
| `emergency` | Emergency call-out | 35000 | base fee |
| `training` | IT training | 8000 | per hour |

Checkout and invoices build `price_data` from this allowlist (no client-supplied amounts).

## User flows

### A. Pay online (Checkout)

1. Client opens `/pay`, selects SKU + quantity, enters name/email/company.
2. Frontend `POST /.netlify/functions/create-checkout-session`.
3. Function creates/finds Customer, creates Checkout Session (`mode: payment`), returns `url`.
4. Client pays on Stripe-hosted Checkout.
5. Redirect to `/pay/success?session_id=…` (display-only).
6. Webhook marks fulfillment / notifies Justin (email can stay Base44 later).

### B. Send invoice (Invoicing)

1. Operator uses `/pay` → “Send invoice” (or Dashboard).
2. Frontend `POST /.netlify/functions/create-invoice` with customer + line items.
3. Function creates Customer, InvoiceItems, Invoice (`collection_method: send_invoice`, `days_until_due: 14`), finalizes, sends.
4. Client pays hosted invoice URL; webhook handles `invoice.paid`.

## Security checklist

- [x] Secret key only in Netlify / local `.env.local` (gitignored)
- [x] Amounts from server catalog, not request body
- [ ] Webhook signature verification with `STRIPE_WEBHOOK_SECRET`
- [ ] Rotate to claimed/production restricted key before go-live
- [ ] Enable Stripe Radar / 2FA on the Dashboard account
- [ ] Do not enable `automatic_tax` until tax registrations are configured

## Environment variables

| Name | Where | Required |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Netlify + `.env.local` | Yes |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Netlify + `.env.local` | Recommended |
| `STRIPE_WEBHOOK_SECRET` | Netlify | Yes for production webhooks |
| `SITE_URL` | Netlify | Yes (`https://itsamoa.goldentide.cloud`) |
| `STRIPE_INVOICE_NOTIFY_EMAIL` | Netlify | Optional (default justin@goldentide.cloud) |

## Go-live sequence

1. Claim the development sandbox (`stripe sandbox claim`) or connect the real Golden Tide Stripe account.
2. Install Cursor Stripe plugin + authenticate `https://mcp.stripe.com`; re-run `stripe_implementation_planner`.
3. Recreate Products/Prices in the production account (or keep `price_data`).
4. Set Netlify env vars; deploy.
5. `stripe listen --forward-to https://itsamoa.goldentide.cloud/.netlify/functions/stripe-webhook` locally; then Dashboard webhook endpoint for prod.
6. Test card `4242…` in test mode; then switch keys to live RAKs.
7. Update Terms §5 to mention card payment via Stripe alongside BSP.

## Existing code review

| Finding | Severity | Action |
| --- | --- | --- |
| `@stripe/stripe-js` + `@stripe/react-stripe-js` in `package.json` but unused | Low | Keep for future Payment Element; Checkout redirect does not need them yet |
| No server Stripe calls | High (gap) | Add Netlify Functions (this PR) |
| Manual Excel/Word/PDF invoices only | Medium | Keep as offline templates; Stripe Invoices for electronic collection |
| Contact form → Base44 lead only | Info | Leave as sales intake; `/pay` is for payment |

## Out of scope (later)

- Subscriptions / retainers (Billing)
- Stripe Tax / VAGST automation
- Customer Portal for self-serve invoice history
- Base44 admin UI for invoice drafting
- Adaptive Pricing / multi-currency customers

## Dev sandbox (this Cloud Agent)

- Account: `acct_1UM0S2DRbbrzTDOa`
- Claim before expiry: https://dashboard.stripe.com/onboard_sandbox/YWNjdF8xVU0wUzJEUmJicnpURE9hLDE3OTE2MzExODcv100lIFgNV5U
- Expires: 2026-10-10
- Created via `stripe sandbox create --from-git` for local smoke tests. Claim into the Golden Tide Stripe login, or replace keys with your own sandbox/RAKs.
