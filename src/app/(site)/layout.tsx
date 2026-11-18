import SiteHeader from "@/shared/components/Header/SiteHeader";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SiteHeader />
            {children}
        </>
    );
}