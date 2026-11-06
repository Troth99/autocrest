import type { AppUser } from "@/shared/types/currentUser";

export function getProfileDisplayDetails(user: AppUser) {
  // Location shown in the personal information card.
  const countryName = user.countryCode
    ? (new Intl.DisplayNames(["en"], { type: "region" }).of(user.countryCode) ??
      user.countryCode)
    : null;

  const location =
    [user.city, user.region, countryName].filter(Boolean).join(", ") || null;

  // Account dates and sign-in details.
  const memberSince = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(user.created_at));

  const lastSignIn = user.last_sign_in_at
    ? new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(user.last_sign_in_at))
    : "Not available";

 const provider = user.signInProvider;


  let signInMethod = "Not available";

  if (provider === "email") {
    signInMethod = "Email and password";
  } else if (provider) {
    signInMethod = `${provider.charAt(0).toUpperCase()}${provider.slice(1)} account`;
  }

  return { location, memberSince, lastSignIn, signInMethod };
}
