"use client";

import { createContext, ReactNode, useContext } from "react";
import type { User } from "@supabase/supabase-js";
import type { UserProfile } from "@/shared/types/currentUser";

const CurrentUserContext = createContext<{ user: User | null; profile: UserProfile | null } | undefined>(
  undefined,
);

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
    <CurrentUserContext.Provider value={{ user: initialUser, profile: initialProfile }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error(
      "useCurrentUser must be used inside CurrentUserProvider",
    );
  }

  return context;
}
