# Ficlet

Ficlet is a romantic fantasy story generator built with Next.js. Users choose a vibe, tropes, character archetypes, and emotional payoff, then receive a custom fantasy scene tailored to their preferences.

This project combines a polished landing experience with a lightweight AI story-generation flow using Supabase authentication and an OpenRouter-powered model.

## Features

- Personalized fantasy romance prompt builder
- Tropes like enemies-to-lovers, fake dating, slow burn, and more
- Magic-link sign-in flow with Supabase
- One free story generation experience per user
- Streaming-style story generation experience
- Paywall/upgrade path for continued access
- Built with Next.js App Router and TypeScript

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Supabase Auth + Postgres-backed profiles
- OpenRouter API for story planning and generation

## App Overview

The app is designed around a simple user flow:

1. Visitor lands on the homepage and starts the story creation flow.
2. User selects a vibe, tropes, and desired romantic fantasy ingredients.
3. If not signed in, the app sends a magic link via Supabase.
4. After authentication, the app calls the backend generation endpoint.
5. The server validates the user, checks generation access, and invokes an LLM through OpenRouter.
6. The user receives a generated title, premise, and scene content.

## Project Structure

```bash
.
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts
│   ├── auth/
│   ├── dashboard/
│   ├── generate/
│   ├── login/
│   ├── pricing/
│   ├── page.tsx
│   └── layout.tsx
├── components/
├── lib/
│   ├── supabase.ts
│   └── supabase/
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── proxy.ts
└── README.md
```

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 20+
- npm
- A Supabase project
- An OpenRouter API key

## Environment Variables

Create a `.env.local` file in the project root with the following values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_MODEL=openai/gpt-4o-mini
```

If you are using Supabase Auth, also make sure your auth redirect settings include the app’s callback routes, especially for magic links.

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Linting

```bash
npm run lint
```

## Notes

This app is built for a creative storytelling product and currently includes a free-generation gate plus a premium paywall flow. If you want to extend it, the most natural next steps are:

- add persistent saved stories
- support subscriptions or credits through Stripe
- add browseable story history
- let users customize tone, length, and chapter count
- add image or cover art generation

## License

This project does not include a license file yet. If you plan to publish it publicly, add one before distributing the code.

## Credits

Built as a playful fantasy-romance story generator using Next.js, Supabase, and OpenRouter.
