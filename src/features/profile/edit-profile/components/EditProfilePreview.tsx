import { Mail, Phone } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { getInitials } from "@/features/profile/utils/getInitials";

type Props = {
  name: string;
  email: string | null;
  phone: string;
  avatarUrl: string | null;
};
export default function EditProfilePreview({
  name,
  email,
  phone,
  avatarUrl,
}: Props) {
  return (
    <aside className="rounded-2xl border border-line bg-panel px-6 py-10 sm:px-8">
      <div className="flex flex-col items-center text-center">
        <Avatar className="size-32 sm:size-40">
          {avatarUrl && (
            <AvatarImage src={avatarUrl} alt={`${name}'s profile picture`} />
          )}
          <AvatarFallback className="bg-linear-to-br from-info-soft to-info/30 text-5xl font-medium text-info sm:text-6xl">
            {getInitials(name, email ?? "")}
          </AvatarFallback>
        </Avatar>
        <h2 className="mt-6 w-full wrap-break-word text-2xl font-semibold tracking-tight">
          {name}
        </h2>
        <span className="mt-3 rounded-full border border-info-border bg-info-soft px-4 py-1.5 text-xs font-medium text-info">
          AutoCrest member
        </span>
      </div>
      <div className="mt-8 space-y-5 border-t border-line pt-6 text-sm text-muted">
        <p className="flex items-start gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-info" />
          <span className="wrap-break-word">
            {email ?? "No email available"}
          </span>
        </p>
        <p className="flex items-center gap-3">
          <Phone className="size-5 shrink-0 text-info" />
          {phone || "No phone added"}
        </p>
      </div>
    </aside>
  );
}
