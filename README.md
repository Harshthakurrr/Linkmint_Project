# LinkMint (TinyLink+)

A compact URL shortener built with Next.js + Prisma + Postgres. Compliant with the TinyLink assignment.

**Reference PDF (assignment):** /mnt/data/42348453-91fb-4385-9456-285f36743a86.pdf

## Quick start
1. Copy repo
2. Create a Neon/Postgres DB and set `DATABASE_URL` in `.env`
3. Set `BASE_URL` to your Vercel URL or `http://localhost:3000`
4. `npm install`
5. `npx prisma generate`
6. `npx prisma migrate dev --name init`
7. `npm run dev`

## Endpoints (required by autograder)
- `GET /healthz` → 200
- `POST /api/links` → create link (409 if exists)
- `GET /api/links` → list links
- `GET /api/links/:code` → single link
- `DELETE /api/links/:code` → delete
