import type { AppUser } from "@/shared/types/currentUser";

export type ProfileCompletionProps = {
  user: Pick<
    AppUser,
    "fullName" | "username" | "avatarUrl" | "phone" | "city" | "bio"
  >;
};
