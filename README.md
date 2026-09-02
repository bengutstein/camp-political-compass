# Berkshires Political Compass

An original, local-first two-dimensional opinion quiz. It uses dummy statements and is designed for quick customization without touching the UI or scoring plumbing.

## Run locally

```bash
nvm use
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run dev
```

The project targets Node 22 (see `.nvmrc`); this is a supported Node release for both Next and Prisma.

Open `http://localhost:3000`. Run the test suite with `npm test`, and produce a production build with `npm run build`.

`db:push` creates the local SQLite database from `prisma/schema.prisma`. The committed migration in `prisma/migrations` can be used instead with `npm run db:migrate`.

## Customizing the quiz

All presentation and content choices are deliberately centralized:

- `config/quizConfig.ts` — quiz title and description, section names, answer labels/numbers, axis titles/endpoints, quadrant names, descriptions, and colors.
- `data/questions.ts` — the 30 dummy statements, their section assignment, X/Y weights, and optional `reverseScored` flag.

A question can affect either coordinate or both:

```ts
{ id: "q-example", text: "A placeholder statement.", section: "society", weights: { x: 0.8, y: -0.4 } }
```

## Scoring

Answer values are multiplied by the corresponding X and Y weights. `lib/scoring.ts` adds the contributions, divides each raw total by its theoretical maximum possible magnitude, then maps it to `-10…+10`, clamps it, and rounds to two decimals. The API route is the authoritative scorer; the browser only submits answers.

`quizConfig.scoring.intensityMultiplier` controls how quickly strongly consistent answer patterns reach the outer ends of the chart. It is set to `1.5` for this prototype and can be adjusted without changing the scoring implementation.

Anonymous submissions are saved through Prisma with scores and JSON answers only. No email, IP, location, or account data is requested. `GET /api/stats` provides aggregate count and average coordinates without exposing individual responses.

## Public result map

On the results page, a participant may enter a display name and choose **Save my result**. That name and its two scores are then available through `GET /api/results` and appear as a hoverable point on the landing-page compass. Only the chosen display name and the two compass coordinates are shared publicly; quiz answers remain private.

## Deploying

For a production deployment, set `DATABASE_URL` to a production-compatible Prisma database URL (SQLite is fine for a small single-instance deployment), run `prisma generate` during build, and apply migrations with `prisma migrate deploy`. Set the host's build command to `npm run build` and start command to `npm run start`.
