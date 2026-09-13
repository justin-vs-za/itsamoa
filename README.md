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
