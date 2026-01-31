# dwijabake

Production-ready monorepo: Next.js (App Router, Tailwind v4), NestJS, PostgreSQL (Docker), Prisma.

## Requirements

- **Node.js** LTS (20+)
- **pnpm** 9+
- **Docker** (for PostgreSQL)

## Setup

```bash
# Install dependencies
pnpm install

# Copy env and adjust if needed
cp .env.example .env

# Start Postgres (named volume)
pnpm db:up

# Run Prisma migration (first time)
pnpm db:migrate

# Generate Prisma client (after schema changes)
pnpm --filter api exec prisma generate
```

## Development

Starts Postgres (if not running), then API and Web with hot-reload:

```bash
pnpm dev
```

- **Web:** http://localhost:3000  
- **API health:** http://localhost:3001/health  
- **API DB check:** http://localhost:3001/db  

## Production

```bash
# Build all
pnpm build

# Start Postgres
pnpm db:up
pnpm db:migrate

# Run API (from apps/api)
pnpm --filter api start:prod

# Run Web (from apps/web)
pnpm --filter web start
```

Use a process manager (e.g. PM2) or containers in production; set env vars per environment. Postgres is exposed on host port **5433** (container stays on 5432).

## Project structure

```
apps/
  web/     Next.js 15, App Router, Tailwind v4
  api/     NestJS, Prisma, /health, /db
packages/
  shared/  Shared TypeScript types/utils
infra/
  docker-compose.yml   Postgres 16, named volume
```

## Env vars (see `.env.example`)

- `DATABASE_URL` – Postgres connection string (API/Prisma)
- `API_PORT` – API server port (default 3001)
- `WEB_PORT` – Next.js port (default 3000)
- `CORS_ORIGIN` – Allowed origin for API (e.g. http://localhost:3000)
- `NEXT_PUBLIC_API_URL` – API base URL used by the web app (e.g. http://localhost:3001)
