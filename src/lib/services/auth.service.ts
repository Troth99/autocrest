import { createClient } from "@/lib/supabase/client";

export type RegisterInput = {
  email: string;
  password: string;
  username: string;
};

export async function registerUser({
  email,
  password,
  username,
}: RegisterInput): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (error) {
    throw error;
  }
}
