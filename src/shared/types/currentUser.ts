export type CurrentUser = {
  id: string;
  email: string | null;
  name: string;
  fullName: string | null;
  username: string;
  avatarUrl: string | null;
  phone: string | null;
  countryCode: string | null;
  region: string | null;
  city: string | null;
  bio: string | null;
  provider: string | null;
  emailConfirmed: boolean;
  createdAt: string;
  lastSignInAt: string | null;
};

export type CurrentUserContextValue = {
  user: CurrentUser | null;
  setUser: (user: CurrentUser | null) => void;
};
