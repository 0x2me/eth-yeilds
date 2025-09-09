# ETH Yields – Simple Architecture Overview

This document is a short, high-level overview. We will expand it as the project grows.

## Frontend

- Framework: Next.js (app router) with Tailwind CSS v4
- Location: `web/`
- Deploy: Vercel
- Env:
  - `NEXT_PUBLIC_API_URL` → public base URL of the Rust API (e.g., `https://api.example.com`)

## Backend

- Language: Rust
- Web: Axum (async, Tokio)
- ORM: SeaORM (Postgres)
- Database: PostgreSQL
- Deploy: Hetzner VPS (via Docker/Compose or systemd)
- Key env:
  - `DATABASE_URL` → `postgres://user:pass@host:5432/dbname`
  - `RUST_LOG` → log level (e.g., `info`)

## Database

- Engine: PostgreSQL 15+
- Recommendation: Keep the DB close to the backend (same DC/provider) to minimize latency.
- For simplicity now: host Postgres on the Hetzner VPS (Docker). Consider managed Postgres later for backups/HA.

## Local Development (minimal)

1. Start API (ensure a Postgres is available locally):
   - `cd services/api`
   - `cargo run`
2. Start web:
   - `cd web`
   - `pnpm dev`

## Deployment (minimal)

- Frontend (Vercel):
  - Connect repo, set `NEXT_PUBLIC_API_URL`, deploy.
- Backend (Hetzner):
  - Provision VPS, install Docker, run API container, expose via reverse proxy (e.g., Caddy/Traefik/nginx) on `api.example.com`.
  - Configure `DATABASE_URL` and TLS.

## Next Steps (to be added later)

- OpenAPI spec from the Rust API and TypeScript client generation in `web/`.
- CI/CD for API image publish and Hetzner deploy.
- Backups/monitoring (e.g., pg_dump + object storage, health checks, structured logs).
