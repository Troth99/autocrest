import type { UserProfile } from "@/shared/types/currentUser";

export type ProfileCompletionProps = {
  user: Pick<
    UserProfile,
    "fullName" | "username" | "avatarUrl" | "phone" | "city" | "bio"
  >;
};
