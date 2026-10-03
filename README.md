# Golden Tide IT Professional Services

IT infrastructure, cloud architecture, and cybersecurity consultancy serving Samoa, New Zealand, and Australia.

- **Live:** https://itsamoa.goldentide.cloud
- **Base44 app:** https://itsamoa.base44.app/
- **Repo:** https://github.com/justin-vs-za/itsamoa

Built with [Base44](https://base44.com). Frontend is a Vite + React app; backend/API calls go to the hosted Base44 app.

## Local development

```bash
npm install
cp .env.example .env.local   # already filled with production app id
npm run dev
```

For full Base44 local backend (entities, functions), use the Base44 CLI (`base44 login && base44 link && base44 dev`) — see Base44 docs.

## Production build

```bash
npm ci
npm run build   # output in dist/
```

Netlify builds from `main` and publishes `dist/` to **itsamoa.goldentide.cloud**.

## Stripe (Payments + Invoicing)

Integration plan: [`docs/stripe-integration-plan.md`](docs/stripe-integration-plan.md).

Local/test setup:

1. Add Stripe keys to `.env.local` (see `.env.example`). Prefer a [sandbox](https://docs.stripe.com/sandboxes) or restricted test key.
2. `npm run dev` for the site; use `npx netlify dev` (or `npm run stripe:smoke`) so `/.netlify/functions/*` endpoints load with env vars.
3. Open `/pay` for Checkout or “Send invoice”.
4. Forward webhooks: `stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook` and set `STRIPE_WEBHOOK_SECRET`.

Netlify production env: `STRIPE_SECRET_KEY`, `VITE_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `SITE_URL=https://itsamoa.goldentide.cloud`.

Published rate-card amounts are WST; Stripe settles in USD at the same numeric amounts (Samoa/WST is not a Stripe settlement currency).
