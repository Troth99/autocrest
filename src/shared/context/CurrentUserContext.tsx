"use client";

import { createContext, ReactNode, useContext } from "react";
import type { User } from "@supabase/supabase-js";
import type { UserProfile } from "@/shared/types/currentUser";

// Undefined means no provider is present; null means no user or profile is available.
const CurrentUserContext = createContext<
  { user: User | null; profile: UserProfile | null } | undefined
>(undefined);

// Receives data loaded by RootLayout and shares it with descendant components.
export function CurrentUserProvider({
  initialUser,
  initialProfile,
  children,
}: {
  initialUser: User | null;
  initialProfile: UserProfile | null;
  children: ReactNode;
}) {
  return (
    // Expose the data as user and profile to components rendered inside this provider.
    <CurrentUserContext.Provider
      value={{ user: initialUser, profile: initialProfile }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

// Read the shared user and profile without passing them through props.
export function useCurrentUser() {
  const context = useContext(CurrentUserContext);

  // Catch components that try to read this context outside its provider.
  if (!context) {
    throw new Error("useCurrentUser must be used inside CurrentUserProvider");
  }

  return context;
}
