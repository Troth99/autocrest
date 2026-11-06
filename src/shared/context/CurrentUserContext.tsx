"use client";

import { createContext, ReactNode, useContext } from "react";
import type { AppUser } from "@/shared/types/currentUser";

// Undefined means no provider is present; null means no user is signed in.
const CurrentUserContext = createContext<
  {
    user: AppUser | null;
    profileError: string | null;
  } | undefined
>(undefined);

// Receives data loaded by RootLayout and shares it with descendant components.
export function CurrentUserProvider({
  initialUser,
  initialProfileError,
  children,
}: {
  initialUser: AppUser | null;
  initialProfileError: string | null;
  children: ReactNode;
}) {
  return (
    // Expose the combined user to components rendered inside this provider.
    <CurrentUserContext.Provider
      value={{
        user: initialUser,
        profileError: initialProfileError,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

// Read the shared user without passing it through props.
export function useCurrentUser() {
  const context = useContext(CurrentUserContext);

  // Catch components that try to read this context outside its provider.
  if (!context) {
    throw new Error("useCurrentUser must be used inside CurrentUserProvider");
  }

  return context;
}
