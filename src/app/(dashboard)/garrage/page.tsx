import GaragePage from "@/features/garage/GaragePage";

export default async function GarageRoute({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  return (
    <GaragePage query={typeof q === "string" ? q.trim().slice(0, 100) : ""} />
  );
}
