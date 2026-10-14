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
             redirect("/login"); 
        }
      return (
        <div className="mx-auto w-full max-w-7xl flex-1 border-x border-line">
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      );
}
