import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function IsDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) 

{
     const supabase = await createClient()
    
        const {
            data: { user }
        } = await supabase.auth.getUser();
    
        if(!user) {
             redirect("/login"); // Replace with your home page route
        }
      return children;
}
