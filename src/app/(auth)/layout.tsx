import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const supabase = await createClient()

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if(user) {
        // Redirect to home page or handle authenticated state
         redirect("/"); // Replace with your home page route
    }
  return children;
}
