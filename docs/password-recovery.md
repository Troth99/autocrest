# Password recovery

`/forgot-password` requests a Supabase recovery email. The default Supabase reset
email template should keep its `{{ .ConfirmationURL }}` link. That link returns
the browser to `/auth/callback?next=/reset-password`, where the PKCE code is
exchanged for a session. The callback accepts only the explicit reset destination;
other destinations retain the existing OAuth flow.

In Supabase Authentication > URL Configuration, allow the callback for each
environment, including its recovery query string:

- `http://localhost:3000/auth/callback?next=/reset-password`
- `https://autocrest-web.vercel.app/auth/callback?next=/reset-password`

If the SDK adds `sb_flow_id` for a concurrent PKCE flow, the redirect allowlist
must also cover that query string. Supabase supports URL patterns; keep production
patterns scoped to this application's callback URL. Check the actual link against
the project's allowlist rather than allowing arbitrary external destinations.

Open the email link in the same browser/profile that requested it, because that
browser holds the PKCE verifier. Expired, used or mismatched codes return to the
request form with an actionable error. Cross-device recovery would require a
separately configured token-hash email template and confirmation route.

The reset page requires a valid session. Accounts with an enabled authenticator
must complete MFA before proceeding. `/verify-2fa` preserves only the allowlisted
reset destination. Saving the new password uses Supabase `updateUser`; existing
provider password policies still apply. After the password is saved, the recovery
form signs the user out and reloads `/login?password_reset=success`. If sign-out
fails, it offers a sign-out retry without submitting the password update again.
Recovery and MFA pages show only the AutoCrest brand in the header, without
garage tools, profile menus or account navigation.

Verify in the intended Supabase project:

1. Request a link with a test account and open the latest email in the same browser.
2. For an MFA account, complete verification and confirm the reset page follows.
3. Check mismatched/short passwords, then save a valid new password.
4. Sign out and confirm the new password works and the old one fails.
5. Reuse the email link and check that an expired/used link offers a new request.
6. Confirm Google/Facebook callbacks still continue to MFA or the homepage.

Sending an email and changing a real password are not covered by local build or
mock checks. Supabase URL settings, email delivery, SMTP limits and the email
template must be verified separately.

References: [Supabase password recovery](https://supabase.com/docs/guides/auth/passwords)
and [redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls).
