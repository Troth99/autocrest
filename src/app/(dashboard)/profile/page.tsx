import { ProfilePage } from "@/features/profile";
import { createClient } from "@/lib/supabase/server";

export default async function ProfileRoute() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const metadata = user?.user_metadata ?? {};
  const email = user?.email ?? "your-email@example.com";
  const name = metadata.full_name ?? metadata.name ?? metadata.username ?? email.split("@")[0];
  const username = metadata.username ?? email.split("@")[0];
  const memberSince = user?.created_at ? new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(user.created_at)) : "Today";

  return <ProfilePage name={name} email={email} username={username} memberSince={memberSince} emailConfirmed={Boolean(user?.email_confirmed_at)} />;
}
