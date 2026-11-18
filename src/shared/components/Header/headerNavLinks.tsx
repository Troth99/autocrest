import { usePathname } from "next/navigation";

export default function HeaderNavLinks({ href, children }: { href: string, children: React.ReactNode }) {
    const path = usePathname()

}