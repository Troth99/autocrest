"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react";
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
import { logoutUser } from "@/features/auth/actions";
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


  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logoutUser();
      router.push("/");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-full outline-none transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-[0_0_18px_rgb(56_189_248/28%)] focus-visible:ring-2 focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:scale-100">
        <Avatar>
          {avatarUrl && <AvatarImage src={avatarUrl} alt={username} />}
          <AvatarFallback className="bg-info-soft text-info">
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
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
          className="cursor-pointer transition-[background-color,color,transform] duration-200 hover:translate-x-0.5 hover:bg-accent motion-reduce:transition-none motion-reduce:hover:translate-x-0"
          onClick={() => router.push("/profile")}
        >
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer transition-[background-color,color,transform] duration-200 hover:translate-x-0.5 hover:bg-accent motion-reduce:transition-none motion-reduce:hover:translate-x-0"
          onClick={() => router.push("/settings")}
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
          onClick={handleLogout}
        >
          <LogOut />
          {isLoggingOut ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
