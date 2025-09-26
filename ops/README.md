# Operations Playbook

This document summarizes how to apply the secrets captured in `.env.example`
for local, staging, and production deployments.

## Environment provisioning

1. **PostgreSQL** – create isolated databases (`paylexa_dev`, `paylexa_staging`,
   `paylexa_prod`). Map users with least privilege and enable TLS in cloud
   environments.
2. **Redis** – provision a dedicated cache per environment. Enable AOF for
   staging/production if background jobs require recovery guarantees.
3. **Morphon-X** – request API keys and webhook secrets for each environment.
   Register the webhook endpoint at `/security/morphon-x/webhook`.
4. **Card Issuer** – configure the program identifier for the Phoenix virtual
   card program. Rotate webhook secrets quarterly.
5. **Top-up Aggregator** – register callback URL `/payments/top-up/webhook` and
   enable sandbox settlement simulation for non-production environments.

## Secrets management

- Store secrets using the platform vault (e.g., AWS Secrets Manager, HashiCorp
  Vault). Deployments should inject environment variables from the vault rather
  than committing `.env` files.
- Sync `.env.example` whenever new configuration keys are required.
- Document rotations and incident responses in this folder alongside runbooks.

## Configuration overrides

| Variable | Default | Notes |
| --- | --- | --- |
| `JWT_ACCESS_TTL` | `900` | Seconds (15 min) for access tokens. |
| `JWT_REFRESH_TTL` | `604800` | Seconds (7 days) for refresh tokens. |
| `FEATURE_VIRTUAL_CARDS` | `true` | Toggle card issuer integration per environment. |
| `FEATURE_PHOENIX_ANIMATIONS` | `true` | Disable Phoenix animations for low-power builds if set to `false`. |

## Contact

- **Security incidents:** security@paylexa.com
- **Payments operations:** payments-ops@paylexa.com
- **Morphon-X escalations:** morphonx@paylexa.com
