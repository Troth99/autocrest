import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AccountNavigation from "@/shared/components/AccountNavigation";

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
             redirect("/login"); 
        }
      return (
        <div className="flex flex-1 flex-col lg:flex-row">
          <AccountNavigation />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      );
}
