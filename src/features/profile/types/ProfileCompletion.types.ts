import type { CurrentUser } from "@/shared/types/currentUser";

export type ProfileCompletionProps = {
  user: Pick<
    CurrentUser,
    "fullName" | "username" | "avatarUrl" | "phone" | "city" | "bio"
  >;
};
