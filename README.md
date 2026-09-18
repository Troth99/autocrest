This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the homepage by modifying `src/app/(marketing)/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx             # Root layout with the shared header and footer
│   ├── globals.css
│   ├── icon.png
│   ├── (marketing)/
│   │   ├── page.tsx           # /
│   │   └── _components/
│   │       ├── HeroSection/
│   │       ├── ModulesSection/
│   │       ├── HowItWorksSection/
│   │       ├── TimelineSection/
│   │       └── shared/        # Styles shared by homepage sections
│   └── (auth)/
│       └── register/
│           ├── page.tsx       # /register
│           └── _components/
│               └── RegisterForm/
├── components/
│   ├── Header/
│   ├── Footer/
│   └── ui/                   # Styles and UI shared across pages
├── lib/
│   └── supabase/
└── proxy.ts
```

Route groups organize pages without adding their names to URLs. Keep page-specific
components in an adjacent `_components` folder and components shared across pages
in `src/components`. Keep each component's CSS module beside the component.
Use relative imports for local components and styles, and the `@/` alias for
shared UI. The `@/` alias points to `src`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
