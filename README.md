# Paylexa Monorepo

Paylexa is a premium fintech ecosystem that unifies consumer wallets, marketplace escrow, merchant tooling, and Morphon-X AI security. This repository hosts every surface area (backend, web, admin, and mobile) plus shared assets, operational tooling, and CI/CD automation.

## Milestone 0 Scope

The current milestone focuses on a production-ready baseline:

- pnpm workspaces with shared ESLint/Prettier configuration
- Node.js + TypeScript backend wired for Prisma, PostgreSQL, Redis, JWT auth, and Morphon-X hooks
- Vite/Tailwind marketing web app with brand-forward landing sections
- Next.js-based admin console leveraging shadcn-inspired primitives
- Expo SDK 53 React Native mobile shell aligned to onboarding and compliance flows
- Shared branding, UI tokens, and localisation seeds
- Docker Compose stack for local integration (PostgreSQL, Redis, backend, web, admin)
- GitHub Actions pipeline for linting, building, testing, and Docker smoke builds

Future milestones (auth, wallets, KYC, marketplace, Morphon-X, etc.) build upon this foundation.

## Repository Structure

```
/Paylexa-mobile      Expo (SDK 53) application shell with navigation & theming
/paylexa-web         Vite + React marketing experience using shared tokens
/paylexa-admin       Next.js admin console with shadcn-style UI components
/paylexa-backend     Express + Prisma API service with modular architecture
/shared-assets       Brand palette, UI tokens, and i18n JSON shared across apps
/ops                 Dockerfiles, docker-compose stack, operational runbook
/.github/workflows   GitHub Actions automation
/.gh-workflows       Mirrors CI specs for ops visibility
```

## Getting Started

1. **Install dependencies**
   ```bash
   corepack enable
   corepack prepare pnpm@8.15.4 --activate
   pnpm install
   ```
2. **Generate Prisma client**
   ```bash
   pnpm --filter paylexa-backend prisma generate
   ```
3. **Start development servers**
   ```bash
   pnpm --filter paylexa-backend dev        # http://localhost:4000
   pnpm --filter paylexa-web dev            # http://localhost:5173
   pnpm --filter paylexa-admin dev          # http://localhost:3000
   pnpm --filter paylexa-mobile start       # Expo developer tools
   ```

## Environment Configuration

Copy `paylexa-backend/.env.example` to `.env` and adjust the secrets before running the API or docker-compose stack. The example includes keys for PostgreSQL, Redis, JWT, SMTP, Morphon-X, cards, utilities, and swap providers.

## CI/CD

The GitHub Actions workflow performs linting, builds, tests, and Docker image smoke builds on every push/PR targeting `main`. Extend the workflow with deployment jobs once OVHcloud/Hostinger secrets are provisioned.

## Docker Stack

Use the provided Compose file for end-to-end local validation:

```bash
docker compose -f ops/docker-compose.yml up --build
```

This launches PostgreSQL, Redis, the backend API (`http://localhost:4000/api/health`), the marketing web (`http://localhost:4173`), and the admin console (`http://localhost:3000`).

## Backups & Disaster Recovery

Operational guidelines for daily database/Redis exports and Hostinger mirrors live in [`ops/README.md`](ops/README.md). Update the runbook as infrastructure matures.
