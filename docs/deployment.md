# GitHub Actions and Vercel

The workflow `.github/workflows/ci-deploy.yml` runs lint, generates Next.js route
types, checks TypeScript, and builds on pushes and pull requests.

After checks pass, branch pushes deploy to Vercel: `main` goes to production and
other branches create previews. Pull request events only run checks; a push to
an internal PR branch creates its preview. Fork PRs never receive Vercel secrets.
Use GitHub Actions → CI and Vercel deploy → Run workflow to redeploy a branch.

## One-time setup

1. In GitHub → repository Settings → Secrets and variables → Actions, add:
   - `VERCEL_TOKEN`: create at https://vercel.com/account/tokens with access to
     the team owning AutoCrest.
   - `VERCEL_ORG_ID`: the `orgId` in your local `.vercel/project.json`.
   - `VERCEL_PROJECT_ID`: the `projectId` in that same file.
   If the file is missing, run `npx vercel link` and select the existing project.
   Never commit the token or `.vercel` directory.
2. In the Vercel project settings, select Node.js 22.x and confirm `main` is the
   production branch.
3. Configure the application's environment variables in Vercel for both
   Production and Preview:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (currently required by the server helpers)
   - `GEMINI_API_KEY` for document and odometer scanning (server-only)
   - Optional: `GEMINI_MODEL` and `GEMINI_FALLBACK_MODEL`.
   Prefer a separate Supabase project for Preview so previews do not modify
   production data. Configure Supabase Auth redirect URLs for the deployed URLs.
4. Push the workflow and configuration to GitHub and inspect its first run.
   In the repository branch rules for `main`, require a pull request and the
   `Lint, types and build` check before merging.

`vercel.json` disables Vercel's automatic Git deployments so only the checked
GitHub Actions pipeline deploys. Add the secrets before merging this configuration;
otherwise deployments will stop until the secrets are configured. To return to
Vercel's native Git deployment, remove `git.deploymentEnabled: false` and disable
the workflow's deploy job to avoid duplicate deployments.

CI uses placeholder Supabase values for its build and needs no service secrets.
Deployment builds separately using the actual Vercel environment via
`vercel pull`, `vercel build`, and `vercel deploy --prebuilt`. The CI build is
never published. Deployment URLs appear in the workflow job summary.

Supabase migrations are not applied by this workflow. Apply and validate them
separately against the intended database before deploying dependent features.
Passing CI does not verify live auth, Storage, scanning, or database behavior.

References: [Vercel GitHub Actions guide](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel)
and [Vercel Git configuration](https://vercel.com/docs/project-configuration/git-configuration).
