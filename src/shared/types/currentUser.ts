export type CurrentUser = {
  id: string;
  email: string | null;
  name: string;
  username: string;
  avatarUrl: string | null;
  emailConfirmed: boolean;
  createdAt: string
};

export type CurrentUserContextValue = {
  user: CurrentUser | null;
  setUser: (user: CurrentUser | null) => void;
};