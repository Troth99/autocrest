export type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  phone: string | null;
  city: string | null;
  avatar_url: string | null;
  bio: string | null;
};
