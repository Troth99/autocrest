import ComingSoon from "@/shared/components/comingSoon/ComingSoon";

export default function AddVehicleForm() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-xl items-center px-4 py-12 sm:px-6 sm:py-16">
      <div className="w-full">
        <ComingSoon
          backHref="/garrage"
          backLabel="Back to my garage"
        />
      </div>
    </main>
  );
}

