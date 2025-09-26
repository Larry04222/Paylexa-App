# Operations & Deployment Runbook

This directory captures baseline infrastructure artefacts for the Paylexa platform. Use the Docker Compose stack for local integration testing and CI smoke validation, and extend the Dockerfiles for OVHcloud/Hostinger deployments.

## Local Orchestration

```bash
docker compose -f ops/docker-compose.yml up --build
```

This command builds the backend, marketing web, and admin console images, then boots them alongside PostgreSQL and Redis. When the stack is healthy you should reach the following endpoints:

- Backend API health: http://localhost:4000/api/health
- Web landing page: http://localhost:4173
- Admin console: http://localhost:3000

Credentials and secrets should be supplied through environment variables or `.env` files that mirror `paylexa-backend/.env.example`.

## Backup & Restore Policy

- **Daily Backups:** Schedule `pg_dump` and `redis-cli --rdb` jobs on OVHcloud, storing encrypted archives on Hostinger object storage.
- **Restore Runbook:**
  1. Provision fresh PostgreSQL & Redis instances.
  2. Import the most recent SQL dump: `psql paylexa < paylexa_YYYYMMDD.sql`.
  3. Restore Redis snapshot: `redis-cli --pipe < redis_paylexa_YYYYMMDD.rdb`.
  4. Redeploy backend with updated connection strings and verify `/api/health` plus Morphon-X AI guard status.

## CI/CD Hooks

GitHub Actions (`.github/workflows`) build and lint all workspaces. Extend the workflow to push images to your registry and trigger OVHcloud rollouts once secrets are ready.
