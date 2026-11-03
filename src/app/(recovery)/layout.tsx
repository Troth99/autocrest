import SiteHeader from "@/shared/components/Header/SiteHeader";


export default function RecoveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader showNavigation={false} />
      {children}
    </>
  );
}
