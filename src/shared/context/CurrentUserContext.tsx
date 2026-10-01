"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { CurrentUser, CurrentUserContextValue } from "../types/currentUser";

const CurrentUserContext = createContext<CurrentUserContextValue | undefined>(
  undefined,
);

export function CurrentUserProvider({
  initialUser,
  children,
}: {
  initialUser: CurrentUser | null;
  children: ReactNode;
}) {
  const [user, setUser] = useState<CurrentUser | null>(initialUser);
  const [previousInitialUser, setPreviousInitialUser] =
    useState<CurrentUser | null>(initialUser);

  // A route refresh supplies new server data while preserving client state.
  if (initialUser !== previousInitialUser) {
    setPreviousInitialUser(initialUser);
    setUser(initialUser);
  }

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
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
