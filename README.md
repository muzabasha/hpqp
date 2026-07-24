# HPQC learning platform

Interactive static learning platform for **B24EHS522: High Performance and Quantum Computing**.

## Current build

The first production slice includes the responsive shell, delegated client-side routing, dark mode, progress persistence, the complete Unit 1 topic map, the Unit 1 learning sequence, a speedup virtual lab, quick checks, assessment map, syllabus metadata, resources, and Vercel/GitHub Actions configuration.

## Run locally

Serve the repository with any static server, for example `npx serve .`, then open the printed URL. The app uses hash routing so it works from a static host without a backend.

## Validate

Run `npm run check` for JavaScript syntax checks and `npm run build` for the repository integrity check.

## Deployment

The repository is configured for Vercel with `vercel.json` SPA rewrites. GitHub Actions runs syntax and integrity checks on pushes and pull requests.