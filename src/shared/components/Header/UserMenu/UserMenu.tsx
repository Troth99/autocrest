"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { logoutUser } from "@/features/auth/services/auth.service";
import ThemeSelector from "@/shared/components/Header/UserMenu/ThemeSelector/ThemeSelector";

type UserMenuProps = {
  username: string;
  email: string;
  avatarUrl?: string | null;
};

export default function UserMenu({
  username,
  email,
  avatarUrl,
}: UserMenuProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  async function logOutHandler() {
    setIsLoggingOut(true);

    try {
      await logoutUser();
      router.replace("/");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        // Start loading the profile before the user selects it from the menu.
        onPointerEnter={() => router.prefetch("/profile")}
        onFocus={() => router.prefetch("/profile")}
        aria-label="Open account menu"
        className="cursor-pointer rounded-full outline-none ring-1 ring-line transition-shadow hover:ring-border-input focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
      >
        <Avatar>
          {avatarUrl && <AvatarImage src={avatarUrl} alt={username} />}
          <AvatarFallback className="bg-info-soft text-info">
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-4">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-text-primary">
                {username}
              </span>
              <span className="truncate text-xs font-normal text-muted">
                {email}
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer transition-[background-color,color,transform] duration-200 hover:translate-x-0.5 hover:bg-info-soft motion-reduce:transition-none motion-reduce:hover:translate-x-0"
          render={<Link href="/profile" prefetch />}
        >
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer transition-[background-color,color,transform] duration-200 hover:translate-x-0.5 hover:bg-info-soft motion-reduce:transition-none motion-reduce:hover:translate-x-0"
          disabled
        >
          <Settings />
          Settings
        </DropdownMenuItem>
        <ThemeSelector />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer transition-[background-color,color,transform] duration-200 hover:translate-x-0.5 hover:bg-destructive/10 motion-reduce:transition-none motion-reduce:hover:translate-x-0"
          disabled={isLoggingOut}
          onClick={logOutHandler}
        >
          <LogOut />
          {isLoggingOut ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
